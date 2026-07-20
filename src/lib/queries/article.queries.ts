"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/lib/prisma/generated/client";
import { ArticleType } from "@/lib/prisma/generated/enums";

// ─── Include partagé ──────────────────────────────────────────────────────────

const articleInclude = {
   author: true,
   source: true,
   categories: true,
   content: true,
   images: {
      select: {
         imageId: true,
         isPrimary: true,
         order: true,
         image: { select: { url: true, alt: true } },
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

// ─── Type inféré ─────────────────────────────────────────────────────────────

export type ArticleWithRelations = Prisma.ArticleGetPayload<{
   include: typeof articleInclude;
}>;

// ─── Queries ──────────────────────────────────────────────────────────────────

type GetArticlesParams = {
   type?: ArticleType;
   where?: Prisma.ArticleWhereInput;
   orderBy?: Prisma.ArticleOrderByWithRelationInput;
   take?: number;
   skip?: number;
};

export async function getArticlesAction(params?: GetArticlesParams) {
   return prisma.article.findMany({
      where: {
         ...(params?.type && { type: params.type }),
         ...params?.where,
      },
      orderBy: params?.orderBy ?? { updatedAt: "desc" },
      take: params?.take,
      skip: params?.skip,
      include: articleInclude,
   });
}

export async function getArticleBySlug(slug: string) {
   return prisma.article.findUnique({
      where: { slug },
      include: articleInclude,
   });
}

export async function getHomepageArticlesAction() {
   const query = (type: ArticleType) =>
      prisma.article.findMany({
         where: { type },
         orderBy: { updatedAt: "desc" },
         take: 4,
         include: articleInclude,
      });

   const [informations, cuisines, jeuxvideos, leo, caro, mika, maman, sites] =
      await Promise.all([
         query("INFORMATION"),
         query("CUISINE"),
         query("JEUXVIDEO"),
         query("LEO"),
         query("CARO"),
         query("MIKA"),
         query("MAMAN"),
         query("SITES"),
      ]);

   return { informations, cuisines, jeuxvideos, leo, caro, mika, maman, sites };
}