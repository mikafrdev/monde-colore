"use server";
import { prisma } from "@/lib/prisma";

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
