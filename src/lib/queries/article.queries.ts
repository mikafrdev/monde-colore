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
import { getCategoryBySlug } from "./categorie.queries";

// ─── Include partagé ──────────────────────────────────────────────────────────

const articleInclude = {
   author: true,
   source: true,
   categories: true,
   content: true,
   sites: {
      select: { site: true, featured: true, pinned: true, order: true },
   },
   images: {
      select: {
         imageId: true,
         isPrimary: true,
         order: true,
         image: {
            select: {
               url: true,
               alt: true,
            },
         },
      },
   },
   videos: {
      select: {
         videoId: true,
         isPrimary: true,
         order: true,
         caption: true,
         video: {
            select: {
               title: true,
               embedUrl: true,
               fileUrl: true,
               thumbnailUrl: true,
               altText: true,
               provider: true,
               width: true,
               height: true,
               duration: true,
            },
         },
      },
   },
} satisfies Prisma.ArticleInclude;

// ─── Type partagé ─────────────────────────────────────────────────────────────

export type ArticleWithRelations = Prisma.ArticleGetPayload<{
   include: typeof articleInclude;
}>;

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
