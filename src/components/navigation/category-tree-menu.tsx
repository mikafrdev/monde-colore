"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { CategoryWithRelations } from "@/lib/queries/category.types";
import { cn } from "@/lib/utils";

const ARTICLES_ROOT = "/articles";

type CategorieProps = {
   categories: CategoryWithRelations[];
};

export function CategoryTreeMenu({ categories }: CategorieProps) {
   const pathname = usePathname();

   const categoriesMap = useMemo(
      () => new Map(categories.map((c) => [c.id, c])),
      [categories],
   );

   // Cache des descendants complets (pour la réduction transitive).
   const descendantsCache = useMemo(
      () => new Map<string, Set<string>>(),
      [categories],
   );

   // Catégories racines : pas enfant d'une autre catégorie.
   const rootCategories = useMemo(
      () => categories.filter((c) => c.childRelations.length === 0),
      [categories],
   );

   // Segments d'URL après /articles : /articles/politique/partis-politiques -> ["politique", "partis-politiques"]
   const segments = useMemo(() => {
      if (!pathname.startsWith(ARTICLES_ROOT)) return [];
      return pathname.slice(ARTICLES_ROOT.length).split("/").filter(Boolean);
   }, [pathname]);

   // Ids des catégories à garder ouvertes car sur le chemin de l'URL courante.
   const expandedIds = useMemo(() => {
      const ids = new Set<string>();
      let candidates = rootCategories;

      for (const segment of segments) {
         const match = candidates.find((c) => c.slug === segment);
         if (!match) break;

         ids.add(match.id);

         const childIds = match.parentRelations.map((r) => r.childId);
         candidates = childIds
            .map((id) => categoriesMap.get(id))
            .filter((c): c is CategoryWithRelations => !!c);
      }

      return ids;
   }, [segments, rootCategories, categoriesMap]);

   if (rootCategories.length === 0) return null;

   return (
      <SidebarMenu>
         {rootCategories.map((category) => (
            <CategoryTreeItem
               key={category.id}
               category={category}
               parentPath={ARTICLES_ROOT}
               depth={0}
               categoriesMap={categoriesMap}
               descendantsCache={descendantsCache}
               expandedIds={expandedIds}
               pathname={pathname}
            />
         ))}
      </SidebarMenu>
   );
}

/**
 * Renvoie tous les descendants (pas seulement enfants directs) d'une catégorie,
 * avec cache et protection anti-cycle.
 */
function getDescendants(
   id: string,
   categoriesMap: Map<string, CategoryWithRelations>,
   cache: Map<string, Set<string>>,
   visiting: Set<string> = new Set(),
): Set<string> {
   if (cache.has(id)) return cache.get(id)!;
   if (visiting.has(id)) return new Set(); // garde-fou anti-cycle

   visiting.add(id);
   const category = categoriesMap.get(id);
   const result = new Set<string>();

   if (category) {
      for (const rel of category.parentRelations) {
         result.add(rel.childId);
         const childDescendants = getDescendants(
            rel.childId,
            categoriesMap,
            cache,
            visiting,
         );
         childDescendants.forEach((d) => result.add(d));
      }
   }

   visiting.delete(id);
   cache.set(id, result);
   return result;
}

type CategoryTreeItemProps = {
   category: CategoryWithRelations;
   parentPath: string;
   depth: number;
   categoriesMap: Map<string, CategoryWithRelations>;
   descendantsCache: Map<string, Set<string>>;
   expandedIds: Set<string>;
   pathname: string;
};

function CategoryTreeItem({
   category,
   parentPath,
   depth,
   categoriesMap,
   descendantsCache,
   expandedIds,
   pathname,
}: CategoryTreeItemProps) {
   const href = `${parentPath}/${category.slug}`;
   const isActive = pathname === href;

   if (category.slug === "jeux-video") {
   /* console.log({ href, pathname, isActive, parentPath }); */
}

   const rawChildren = category.parentRelations
      .map((r) => categoriesMap.get(r.childId))
      .filter((c): c is CategoryWithRelations => !!c);

   // Réduction transitive : masque un enfant s'il est déjà atteignable
   // via un autre enfant direct de cette catégorie (ex: Football → Sélections
   // nationales est masqué car déjà atteignable via Football → Équipes).
   const children = rawChildren.filter(
      (child) =>
         !rawChildren.some(
            (other) =>
               other.id !== child.id &&
               getDescendants(other.id, categoriesMap, descendantsCache).has(
                  child.id,
               ),
         ),
   );

   const hasChildren = children.length > 0;
   const isOpen = expandedIds.has(category.id);

   const [open, setOpen] = useState(isOpen);
   const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

   // Ajustement du state pendant le render (pattern React recommandé,
   // évite le cascading render d'un useEffect).
   if (isOpen !== prevIsOpen) {
      setPrevIsOpen(isOpen);
      setOpen(isOpen);
   }

   const isRoot = depth === 0;
   const ButtonComponent = isRoot ? SidebarMenuButton : SidebarMenuSubButton;
   const ItemComponent = isRoot ? SidebarMenuItem : SidebarMenuSubItem;

   const button = (
      <ButtonComponent asChild isActive={isActive}>
         <Link href={href}>
            <span className={cn("truncate", isRoot && "font-semibold")}>
               {category.name}
            </span>
         </Link>
      </ButtonComponent>
   );

   if (!hasChildren) {
      return <ItemComponent>{button}</ItemComponent>;
   }

   return (
      <Collapsible
         open={open}
         onOpenChange={setOpen}
         className="group/collapsible w-full"
      >
         <ItemComponent
            className={isRoot ? "flex flex-col items-stretch" : undefined}
         >
            <div className="flex items-center gap-0.5">
               <div className="min-w-0 flex-1">{button}</div>
               <CollapsibleTrigger
                  type="button"
                  className={cn(
                     "flex shrink-0 items-center justify-center rounded-md p-1.5 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  )}
                  aria-label={
                     open
                        ? `Replier ${category.name}`
                        : `Déplier ${category.name}`
                  }
               >
                  <ChevronRight className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
               </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
               <SidebarMenuSub className={cn(!isRoot && "mr-0")}>
                  {children.map((child) => (
                     <CategoryTreeItem
                        key={child.id}
                        category={child}
                        parentPath={href}
                        depth={depth + 1}
                        categoriesMap={categoriesMap}
                        descendantsCache={descendantsCache}
                        expandedIds={expandedIds}
                        pathname={pathname}
                     />
                  ))}
               </SidebarMenuSub>
            </CollapsibleContent>
         </ItemComponent>
      </Collapsible>
   );
}
