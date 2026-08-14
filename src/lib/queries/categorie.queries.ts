"use server";
import { prisma } from "@/lib/prisma";
import { categoryInclude } from "./category.types";
import { Prisma } from "../prisma/generated/client";

export async function getCategoriesAction() {
   return prisma.category.findMany({
      where: {
         articles: {
            some: {
               videos: { some: {} },
            },
         },
      },
      select: { id: true, name: true, slug: true },
      orderBy: { name: "asc" },
   });
}

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

export type CategoryWithRelations = Prisma.CategoryGetPayload<{
   include: typeof categoryInclude;
}>;

type GetCategoriesParams = {
   take?: number;
   skip?: number;
};

export async function getCategoriesWithRelationsAction(
   params?: GetCategoriesParams,
): Promise<CategoryWithRelations[]> {
   return prisma.category.findMany({
      orderBy: { name: "asc" },
      include: categoryInclude,
      take: params?.take ?? 100,
      skip: params?.skip ?? 0,
      cacheStrategy: { ttl: 60, swr: 30 },
   }) as unknown as Promise<CategoryWithRelations[]>;
}
