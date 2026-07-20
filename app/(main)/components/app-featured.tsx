"use client";

import { ArticleType } from "@/lib/prisma/generated/enums";
import { HomepageFeatured } from "./homepage-featured";
import { TypedFeatured } from "@main/components/type-featured";

type AppFeaturedProps = {
   pageType?: ArticleType;
   homepage?: boolean;
};

export function AppFeatured({ pageType, homepage }: AppFeaturedProps) {
   
   if (homepage) {
      return <HomepageFeatured />;
   }

   return <TypedFeatured pageType={pageType} />;
}