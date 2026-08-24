import { Prisma } from "@/lib/prisma/generated/client";
import { CategoryRef } from "@/lib/queries/category.types";

export const articleCardInclude = {
   images: {
      where: { isPrimary: true },
      take: 1,
      select: {
         isPrimary: true, // ← ajouté
         image: {
            select: { url: true, alt: true, width: true, height: true },
         },
      },
   },
   videos: {
      where: { isPrimary: true },
      take: 1,
      select: {
         isPrimary: true, // ← ajouté
         video: {
            select: { thumbnailUrl: true, embedUrl: true },
         },
      },
   },
   categories: {
      select: { id: true, name: true, slug: true },
   },
} satisfies Prisma.ArticleInclude;

export type ArticleCardType = Prisma.ArticleGetPayload<{
   include: typeof articleCardInclude;
}>;

export const articleInclude = {
   author: true,
   source: true,
   categories: true,
   content: true,

   game: {
      select: {
         id: true,
         title: true,
         slug: true,
         coverUrl: true,
         kind: true,
      },
   },

   tags: {
      select: {
         tag: {
            select: { name: true, slug: true },
         },
      },
   },

   sites: {
      select: {
         site: true,
         featured: true,
         pinned: true,
         order: true,
         image: {
            select: { url: true, alt: true },
         },
         video: {
            select: {
               embedUrl: true,
               fileUrl: true,
               thumbnailUrl: true,
            },
         },
      },
   },

   images: {
      select: {
         imageId: true,
         isPrimary: true,
         order: true,
         image: {
            select: { url: true, alt: true, width: true, height: true },
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

export type ArticleWithRelations = Prisma.ArticleGetPayload<{
   include: typeof articleInclude;
}>;

export type ArticleRelatedCategoriesResult = {
   id: string;
   name: string;
   slug: string;
   description: string | null;
   parents: CategoryRef[];
   children: CategoryRef[];
};

const DEFAULT_ARTICLES_PER_CATEGORY = 6;

export const homepageCategoryInclude = {
   articles: {
      take: DEFAULT_ARTICLES_PER_CATEGORY,
      orderBy: { publishedAt: "desc" },
      include: articleCardInclude,
   },
} satisfies Prisma.CategoryInclude;
