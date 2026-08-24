import { Prisma, Site } from "@/lib/prisma/generated/client";
import { articleCardInclude } from "./article.types";

export type CategoryRef = {
   id: string;
   name: string;
   slug: string;
};

export type GetCategoriesParams = {
   take?: number;
   skip?: number;
};

export const categorySelect = {
   id: true,
   name: true,
   slug: true,
   description: true,
   imageId: true,
   isPublic: true,
   createdAt: true,
   updatedAt: true,
} satisfies Prisma.CategorySelect;

export type categorySelect = Prisma.CategoryGetPayload<{
   select: typeof categorySelect;
}>;

export const categoryWithRelationsInclude = {
   image: true,

   parentRelations: {
      include: {
         parent: true,
         child: true,
      },
   },
   childRelations: {
      include: {
         parent: true,
         child: true,
      },
   },

   articles: true,

   /* articles: {
      include: {
         author: true,
         source: true,
         content: true,
         categories: true,
         tags: true,
         contents: true,
         views: true,
         images: true,
         videos: true,
         timelineEvents: true,
         sites: true,
         game: true,
      },
   }, */

   permissions: {
      include: {
         user: true,
      },
   },

   sites: true, // ← nouvelle relation CategorySite
} satisfies Prisma.CategoryInclude;

export type CategoryWithRelations = Prisma.CategoryGetPayload<{
   include: typeof categoryWithRelationsInclude;
}>;

export type ChildCategoryItem = {
   title: string;
   url: string;
   alt: string;
   link: string;
};

export function childCategorySelect(site?: Site) {
   return {
      slug: true,
      parentRelations: {
         // ← corrigé (pas childRelations)
         select: {
            child: {
               // ← on prend .child, pas .parent
               select: {
                  name: true,
                  slug: true,
                  image: {
                     select: {
                        url: true,
                        alt: true,
                     },
                  },
                  sites: site
                     ? {
                          where: { site },
                          select: { order: true },
                       }
                     : undefined,
               },
            },
         },
      },
   } satisfies Prisma.CategorySelect;
}

export type CategoryWithChildRelations = Prisma.CategoryGetPayload<{
   select: ReturnType<typeof childCategorySelect>;
}>;

const homepageCategoryInclude = {
   articles: {
      take: 6,
      orderBy: { publishedAt: "desc" },
      include: articleCardInclude,
   },
} satisfies Prisma.CategoryInclude;

export type CategoryWithArticleCards = Prisma.CategoryGetPayload<{
   include: typeof homepageCategoryInclude;
}>;

export type CategoryPathSegment = {
   id: string;
   name: string;
   slug: string;
};
