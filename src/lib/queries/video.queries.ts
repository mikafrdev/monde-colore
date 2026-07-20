"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/lib/prisma/generated/client";

// ─── Include partagé ──────────────────────────────────────────────────────────

const videoInclude = {
   content: true,

   articles: {
      select: {
         articleId: true,
         isPrimary: true,
         order: true,
         caption: true,
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
} satisfies Prisma.VideoInclude;

// ─── Type inféré ─────────────────────────────────────────────────────────────

export type VideoWithRelations = Prisma.VideoGetPayload<{
   include: typeof videoInclude;
}>;

// ─── Queries ──────────────────────────────────────────────────────────────────

type GetVideosParams = {
   where?: Prisma.VideoWhereInput;
   orderBy?: Prisma.VideoOrderByWithRelationInput;
   take?: number;
   skip?: number;
};

export async function getVideosAction(params?: GetVideosParams) {
   return prisma.video.findMany({
      where: params?.where,
      orderBy: params?.orderBy ?? {
         createdAt: "desc",
      },
      take: params?.take,
      skip: params?.skip,
      include: videoInclude,
   });
}

export async function getVideoById(id: string) {
   return prisma.video.findUnique({
      where: { id },
      include: videoInclude,
   });
}

export async function getPublishedVideosAction(limit?: number) {
   return prisma.video.findMany({
      where: {
         status: "PUBLISHED",
      },
      orderBy: {
         publishedAt: "desc",
      },
      take: limit,
      include: videoInclude,
   });
}

export async function getLatestVideosAction(limit = 12) {
   return prisma.video.findMany({
      where: {
         status: "PUBLISHED",
      },
      orderBy: {
         createdAt: "desc",
      },
      take: limit,
      include: videoInclude,
   });
}
