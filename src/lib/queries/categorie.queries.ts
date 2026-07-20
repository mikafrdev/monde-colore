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
