"use client";

import { PublicationStatus, Site } from "@/lib/prisma/generated/enums";
import { HomepageFeatured } from "./homepage-featured";
import { TypedFeatured } from "@main/components/type-featured";

type AppFeaturedProps = {
   site: Site;
   categorySlug?: string;
   pageType?: PublicationStatus;
   isHomepage?: boolean;
};

export function AppFeatured({ site, categorySlug, isHomepage }: AppFeaturedProps) {
   
   if (isHomepage) {
      return <HomepageFeatured site={site} />;
   }

   return <TypedFeatured categorySlug={categorySlug} site={site} />;
}