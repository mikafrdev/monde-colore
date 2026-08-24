/* 
bug connu et documenté, pas une erreur de configuration de ta part.

Quand @prisma/extension-accelerate est utilisé avec Prisma 7, tous les types sont perdus et tout devient any — c'est l'issue prisma/prisma#28580, toujours ouverte. Ça correspond exactement à ton symptôme : findMany avec include te retourne le type "plat" de l'Article sans les relations. 
GitHub

Donc : upgrader Accelerate ne réglera rien, le bug est dans l'interaction Prisma 7 ↔ $extends(), pas dans une version spécifique de l'extension.

Solutions possibles, en gardant Accelerate :

Option A — Contourner en typant manuellement le retour (le plus pragmatique en attendant le fix upstream) */

"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/lib/prisma/generated/client";
import { PublicationStatus, Site } from "@/lib/prisma/generated/enums";
import { typed } from "./typed-query";
import { getCategoryBySlug, getCategoryPathChain } from "./categorie.queries";
import { Category } from "../prisma/generated/browser";
import {
   ArticleCardType,
   articleCardInclude,
   articleInclude,
   ArticleRelatedCategoriesResult,
   ArticleWithRelations,
   homepageCategoryInclude,
} from "./article.types";
import { siteVisibleWhere } from "./where-queries";
import { CategoryWithArticleCards } from "./category.types";

// ─── Params ───────────────────────────────────────────────────────────────────

type GetArticlesParams = {
   type?: PublicationStatus;
   site?: Site;
   where?: Prisma.ArticleWhereInput;
   orderBy?: Prisma.ArticleOrderByWithRelationInput;
   take?: number;
   skip?: number;
};

// ─── Actions ──────────────────────────────────────────────────────────────────

export async function getArticlesBySiteAndCategoryAction(
   site?: Site,
   categorySlug?: string,
) {
   return typed<ArticleWithRelations[]>(
      prisma.article.findMany({
         where: {
            ...(categorySlug && {
               categories: {
                  some: {
                     slug: categorySlug,
                  },
               },
            }),
            ...(site && {
               sites: {
                  some: {
                     site,
                  },
               },
            }),
         },
         orderBy: {
            updatedAt: "desc",
         },
         include: articleInclude,
      }),
   );
}

export async function getArticleBySlug(slug: string) {
   return typed<ArticleWithRelations | null>(
      prisma.article.findUnique({
         where: { slug },
         include: articleInclude,
      }),
   );
}

const query = (categorySlug: string) =>
   typed<ArticleWithRelations[]>(
      prisma.article.findMany({
         where: {
            categories: {
               some: {
                  slug: categorySlug,
               },
            },
         },
         orderBy: {
            updatedAt: "desc",
         },
         take: 4,
         include: articleInclude,
      }),
   );

export async function getHomepageFeaturedAction(site: Site) {
   const categorySlugs = ["informations", "cuisine", "jeux-video"];

   const articles = await typed<ArticleWithRelations[]>(
      prisma.article.findMany({
         where: {
            sites: {
               some: {
                  site,
               },
            },

            categories: {
               some: {
                  slug: {
                     in: categorySlugs,
                  },
               },
            },
         },

         orderBy: {
            updatedAt: "desc",
         },

         include: articleInclude,
      }),
   );

   return {
      informations: articles.filter((article) =>
         article.categories.some(
            (category) => category.slug === "informations",
         ),
      ),

      cuisines: articles.filter((article) =>
         article.categories.some((category) => category.slug === "cuisine"),
      ),

      jeuxvideos: articles.filter((article) =>
         article.categories.some((category) => category.slug === "jeux-video"),
      ),
   };
}

/* TEST */

async function getAllParentIds(
   categoryId: string,
   visited = new Set<string>(),
): Promise<Set<string>> {
   if (visited.has(categoryId)) return visited;
   visited.add(categoryId);

   const relations = await prisma.categoryRelation.findMany({
      where: { childId: categoryId },
      select: { parentId: true },
   });

   for (const rel of relations) {
      await getAllParentIds(rel.parentId, visited);
   }

   return visited;
}

async function getAllChildIds(
   categoryId: string,
   visited = new Set<string>(),
): Promise<Set<string>> {
   if (visited.has(categoryId)) return visited;
   visited.add(categoryId);

   const relations = await prisma.categoryRelation.findMany({
      where: { parentId: categoryId },
      select: { childId: true },
   });

   for (const rel of relations) {
      await getAllChildIds(rel.childId, visited);
   }

   return visited;
}

export async function getArticlesByCategorySlug(
   slug: string,
): Promise<ArticleWithRelations[]> {
   const category = await prisma.category.findUnique({ where: { slug } });
   if (!category) return [];

   const [parentIds, childIds] = await Promise.all([
      getAllParentIds(category.id),
      getAllChildIds(category.id),
   ]);

   const allIds = new Set([...parentIds, ...childIds]);

   const args = {
      where: {
         categories: {
            some: { id: { in: Array.from(allIds) } },
         },
         /* status: "PUBLISHED", */
      },
      include: articleInclude,
      orderBy: { publishedAt: "desc" },
   } satisfies Prisma.ArticleFindManyArgs;

   return prisma.article.findMany(args);
}

export async function getArticleRelatedCategories(
   slug: string,
): Promise<ArticleRelatedCategoriesResult | null> {
   const category = await prisma.category.findUnique({
      where: { slug },
      select: {
         id: true,
         name: true,
         slug: true,
         description: true,
         parentRelations: {
            select: { child: { select: { id: true, name: true, slug: true } } },
         },
         childRelations: {
            select: {
               parent: { select: { id: true, name: true, slug: true } },
            },
         },
      },
   });

   if (!category) return null;

   return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      parents: category.childRelations.map((r) => r.parent), // ✅ mes parents
      children: category.parentRelations.map((r) => r.child), // ✅ mes enfants
   };
}

// Cas 1 : Homepage → catégories racines, 6 articles chacune

const DEFAULT_ARTICLES_PER_CATEGORY = 6;

export async function getArticleHomepageGroupedByCategoryAction(site: Site) {
   // 1. Récupérer les catégories racines du site
   const rootCategories = await prisma.category.findMany({
      where: {
         ...siteVisibleWhere(site),
         childRelations: { none: {} },
      },
      select: { id: true, name: true, slug: true },
   });

   // 2. Pour chaque racine, résoudre ses descendants + fetch ses articles
   const groups = await Promise.all(
      rootCategories.map(async (root) => {
         const descendantIds = await getAllChildIds(root.id); // inclut root.id lui-même

         const articles = await typed<ArticleCardType[]>(
            prisma.article.findMany({
               where: {
                  categories: { some: { id: { in: Array.from(descendantIds) } } },
                  sites: { some: { site } },
               },
               orderBy: { publishedAt: "desc" },
               take: DEFAULT_ARTICLES_PER_CATEGORY,
               include: articleCardInclude,
            }),
         );

         return { category: root, articles };
      }),
   );

   return groups.filter((g) => g.articles.length > 0);
}

// Cas 2 & 3 : catégorie (n'importe quel niveau) → tous les articles
// de cette catégorie + ses descendantes, triés par date, à plat
export async function getArticlesByCategoryPathAction(
   site: Site,
   segments: string[],
) {
   const chain = await getCategoryPathChain(site, segments);
   if (!chain) return null;

   const targetCategory = chain[chain.length - 1]; // dernier segment = catégorie ciblée

   const childIds = await getAllChildIds(targetCategory.id);

   const articles = await typed<ArticleCardType[]>(
      prisma.article.findMany({
         where: {
            categories: { some: { id: { in: Array.from(childIds) } } },
            sites: { some: { site } },
         },
         orderBy: { publishedAt: "desc" },
         include: articleCardInclude,
      }),
   );

   return {
      breadcrumb: chain, // [{ id, name, slug: "alimentation" }, { id, name, slug: "oxalates" }]
      category: targetCategory,
      articles,
   };
}

export async function getArticlesByCategorySlugAction(
   site: Site,
   categorySlug: string,
   /* limit = 6, */
) {
   const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
   });

   if (!category) return null;

   const articles = await typed<ArticleWithRelations[]>(
      prisma.article.findMany({
         where: {
            categories: { some: { slug: categorySlug } },
            sites: { some: { site } },
            /* status: PublicationStatus.PUBLISHED, */
         },
         orderBy: { updatedAt: "desc" },
         /* take: limit, */
         include: articleInclude,
      }),
   );

   return { category, articles };
}
















const football = await prisma.category.findFirst({
   where: { slug: "football" },
});

if (!football) {
   console.log("catégorie football introuvable");
} else {
   const childIds = await getAllChildIds(football.id);
   console.log("descendant ids (avec football lui-même):", Array.from(childIds));

   const articlesInTree = await prisma.article.findMany({
      where: {
         categories: { some: { id: { in: Array.from(childIds) } } },
      },
      select: {
         id: true,
         title: true,
         sites: { select: { site: true } },
      },
   });
   console.log("articles dans l'arbre football (tous sites confondus):", articlesInTree);
}

