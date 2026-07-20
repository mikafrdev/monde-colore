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
   type?: ArticleType;
   where?: Prisma.ArticleWhereInput;
   orderBy?: Prisma.ArticleOrderByWithRelationInput;
   take?: number;
   skip?: number;
};

// ─── Actions ──────────────────────────────────────────────────────────────────

export async function getArticlesAction(
   params?: GetArticlesParams,
): Promise<ArticleWithRelations[]> {
   return prisma.article.findMany({
      where: {
         ...(params?.type && { type: params.type }),
         ...params?.where,
      },
      orderBy: params?.orderBy ?? { updatedAt: "desc" },
      take: params?.take,
      skip: params?.skip,
      include: articleInclude,
      cacheStrategy: { ttl: 60 },
   }) as unknown as Promise<ArticleWithRelations[]>;
}

export async function getArticleBySlug(
   slug: string,
): Promise<ArticleWithRelations | null> {
   return prisma.article.findUnique({
      where: { slug },
      include: articleInclude,
      cacheStrategy: { ttl: 600, swr: 60 },
   }) as unknown as Promise<ArticleWithRelations | null>;
}

export async function getHomepageArticlesAction(): Promise<{
   informations: ArticleWithRelations[];
   cuisines: ArticleWithRelations[];
   jeuxvideos: ArticleWithRelations[];
   leo: ArticleWithRelations[];
   caro: ArticleWithRelations[];
   mika: ArticleWithRelations[];
   maman: ArticleWithRelations[];
   sites: ArticleWithRelations[];
}> {
   const query = (type: ArticleType) =>
      prisma.article.findMany({
         where: { type },
         orderBy: { updatedAt: "desc" },
         take: 4,
         include: articleInclude,
         cacheStrategy: { ttl: 300, swr: 120 },
      }) as unknown as Promise<ArticleWithRelations[]>;

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
