import { Prisma } from "@/lib/prisma/generated/client";

export type CategoryRef = {
   id: string;
   name: string;
   slug: string;
};

export const categoryInclude = {
   parentRelations: {
      include: {
         parent: true,
         child: true,
      },
   },
   childRelations: {
      include: {
         child: true,
         parent: true,
      },
   },
} satisfies Prisma.CategoryInclude;
