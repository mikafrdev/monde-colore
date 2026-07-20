"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/lib/prisma/generated/client";

// ─── Include partagé ──────────────────────────────────────────────────────────

const imageInclude = {
   articles: {
      select: {
         articleId: true,
         isPrimary: true,
         order: true,
         article: {
            select: {
               id: true,
               slug: true,
               title: true,
               excerpt: true,
               publishedAt: true,
            },
         },
      },
   },
} satisfies Prisma.ImageInclude;

// ─── Type inféré ─────────────────────────────────────────────────────────────

export type ImageWithRelations = Prisma.ImageGetPayload<{
   include: typeof imageInclude;
}>;

// ─── Queries ──────────────────────────────────────────────────────────────────

type GetImagesParams = {
   where?: Prisma.ImageWhereInput;
   orderBy?: Prisma.ImageOrderByWithRelationInput;
   take?: number;
   skip?: number;
};

export async function getImagesAction(params?: GetImagesParams) {
   return prisma.image.findMany({
      where: params?.where,
      orderBy: params?.orderBy ?? {
         createdAt: "desc",
      },
      take: params?.take,
      skip: params?.skip,
      include: imageInclude,
   });
}

export async function getImageById(id: string) {
   return prisma.image.findUnique({
      where: { id },
      include: imageInclude,
   });
}

/* export async function getPublishedImagesAction(limit?: number) {
   return prisma.image.findMany({
      where: {
         status: "PUBLISHED",
      },
      orderBy: {
         publishedAt: "desc",
      },
      take: limit,
      include: imageInclude,
   });
}

export async function getLatestImagesAction(limit = 12) {
   return prisma.image.findMany({
      where: {
         status: "PUBLISHED",
      },
      orderBy: {
         createdAt: "desc",
      },
      take: limit,
      include: imageInclude,
   });
}
 */