"use client";

import { usePathname } from "next/navigation";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

// Optionnel : mapper les segments vers des labels lisibles
const segmentLabels: Record<string, string> = {
   dashboard: "Tableau de bord",
   settings: "Paramètres",
   profile: "Profil",
   // Ajoute tes routes ici
};

const hiddenSegments = ["main"];

function formatSegment(segment: string): string {
   return (
      segmentLabels[segment] ??
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
   );
}

export function AppBreadcrumb() {
   const pathname = usePathname();

   if (pathname === "/") return null;

   const segments = pathname
      .split("/")
      .filter(Boolean)
      .filter((s) => !hiddenSegments.includes(s));

   return (
      <Breadcrumb className="px-4 py-4">
         <BreadcrumbList>
            <BreadcrumbItem>
               <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>

            {segments.map((segment, index) => {
               const href = "/" + segments.slice(0, index + 1).join("/");
               const isLast = index === segments.length - 1;
               const label = formatSegment(segment);

               return (
                  <Fragment key={href}>
                     <BreadcrumbSeparator />
                     <BreadcrumbItem>
                        {isLast ? (
                           <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                           <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                        )}
                     </BreadcrumbItem>
                  </Fragment>
               );
            })}
         </BreadcrumbList>
      </Breadcrumb>
   );
}
