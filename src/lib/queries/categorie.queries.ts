"use server";
import { prisma } from "@/lib/prisma";

import {
   categorySelect,
   CategoryWithRelations,
   categoryWithRelationsInclude,
   ChildCategoryItem,
   childCategorySelect,
   GetCategoriesParams,
} from "./category.types";
import { typed } from "./typed-query";
import { Site } from "../prisma/generated/enums";

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
         where: {
            ...(site && {
               sites: {
                  some: {
                     site,
                     visible: true,
                  },
               },
            }),
         },
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

const select = childCategorySelect(site);
   console.log("select généré:", JSON.stringify(select, null, 2));



   const parent = await prisma.category.findUnique({
      where: { slug: parentSlug },
      select: childCategorySelect(site),
   });

console.log("parent complet:", JSON.stringify(parent, null, 2));
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
