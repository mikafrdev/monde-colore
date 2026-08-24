"use server";
import { prisma } from "@/lib/prisma";

import {
   CategoryPathSegment,
   categoryPathSegmentSelect,
   categorySelect,
   CategoryWithRelations,
   categoryWithRelationsInclude,
   ChildCategoryItem,
   childCategorySelect,
   GetCategoriesParams,
} from "./category.types";
import { typed } from "./typed-query";
import { Site } from "../prisma/generated/enums";
import { siteVisibleWhere } from "./where-queries";

export async function getCategorySlugs() {
   return prisma.category.findMany({
      orderBy: {
         name: "asc",
      },
      select: {
         slug: true,
      },
   });
}

export async function getCategoryBySlug(slug: string) {
   return prisma.category.findUnique({
      where: {
         slug,
      },
   });
}

export async function getCategoriesAction(
   params?: GetCategoriesParams,
): Promise<categorySelect[]> {
   return prisma.category.findMany({
      orderBy: { name: "asc" },
      select: categorySelect,
      take: params?.take ?? 100,
      skip: params?.skip ?? 0,
   });
}

export async function getCategoriesWithRelationsAction(
   params?: GetCategoriesParams,
): Promise<CategoryWithRelations[]> {
   return prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      include: categoryWithRelationsInclude,
      take: params?.take ?? 100,
      skip: params?.skip ?? 0,
      /* cacheStrategy: { ttl: 60, swr: 30 }, */
   }) as unknown as Promise<CategoryWithRelations[]>;
}

export async function getCategoriesBySiteAction(
   site?: Site,
   options?: GetCategoriesParams,
) {
   return typed<CategoryWithRelations[]>(
      prisma.category.findMany({
         where: { ...siteVisibleWhere(site) },
         orderBy: {
            name: "asc",
         },
         include: categoryWithRelationsInclude,
         take: options?.take ?? 100,
         skip: options?.skip ?? 0,
      }),
   );
}

export async function getChildCategoriesAction(
   parentSlug: string,
   site?: Site,
): Promise<ChildCategoryItem[]> {
   /* const select = childCategorySelect(site); */
   /* console.log("select généré:", JSON.stringify(select, null, 2)); */

   const parent = await prisma.category.findUnique({
      where: { slug: parentSlug },
      select: childCategorySelect(site),
   });

   /* console.log("parent complet:", JSON.stringify(parent, null, 2)); */

   if (!parent) return [];

   return parent.parentRelations // ← corrigé
      .map((rel) => rel.child)
      .filter((child) => !site || (child.sites?.length ?? 0) > 0)
      .sort((a, b) => {
         const orderA = a.sites?.[0]?.order ?? 0;
         const orderB = b.sites?.[0]?.order ?? 0;
         return orderA - orderB;
      })
      .map((child) => ({
         title: child.name,
         url: child.image?.url ?? "",
         alt: child.image?.alt ?? child.name,
         link: `/${parentSlug}/${child.slug}`,
      }));
}

export async function getCategoryByPath(site: Site, segments: string[]) {
   if (segments.length === 0) return null;

   const targetSlug = segments[segments.length - 1];
   const parentSlug =
      segments.length > 1 ? segments[segments.length - 2] : null;

   const category = await prisma.category.findFirst({
      where: {
         slug: targetSlug,
         ...siteVisibleWhere(site),
         ...(parentSlug && {
            childRelations: {
               some: { parent: { slug: parentSlug } },
            },
         }),
      },
   });

   return category;
}

/**
 * Résout un chemin d'URL segment par segment en descendant le graphe,
 * en validant chaque lien parent→enfant. Retourne la chaîne complète
 * (utile pour le fil d'ariane) + la catégorie cible (dernier segment).
 */
export async function getCategoryPathChain(
   site: Site,
   segments: string[],
): Promise<CategoryPathSegment[] | null> {
   if (segments.length === 0) return null;

   const chain: CategoryPathSegment[] = [];
   let previousId: string | null = null;

   for (const slug of segments) {
      const category: CategoryPathSegment | null =
         await prisma.category.findFirst({
            where: {
               slug,
               ...siteVisibleWhere(site),
               ...(previousId
                  ? { childRelations: { some: { parentId: previousId } } }
                  : {}),
            },
            select: categoryPathSegmentSelect,
         });

      if (!category) return null;

      chain.push(category);
      previousId = category.id;
   }

   return chain;
}
