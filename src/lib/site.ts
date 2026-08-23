import { Site } from "@/lib/prisma/generated/enums";

const siteValues = Object.values(Site) as string[];

function getCurrentSite(): (typeof Site)[keyof typeof Site] {
   const raw = process.env.NEXT_PUBLIC_SITE;

   if (!raw || !siteValues.includes(raw)) {
      throw new Error(
         `NEXT_PUBLIC_SITE invalide ou manquante : "${raw}". Valeurs attendues : ${siteValues.join(", ")}`,
      );
   }

   return raw as (typeof Site)[keyof typeof Site];
}

export const CURRENT_SITE = getCurrentSite();
