"use client";

import { useMemo } from "react";
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
} from "@/components/ui/sidebar";
import type { CategoryWithRelations } from "@/lib/queries/category.types";
import { cn } from "@/lib/utils";

const ARTICLES_ROOT = "/articles";

type CategorieProps = {
   categories: CategoryWithRelations[];
};

export function CategoryTreeMenu({ categories }: CategorieProps) {
   const pathname = usePathname();

   /* const { data: categories = [], isLoading } = useTableQuery(
      ["categories-with-relations"],
      () => getCategoriesBySiteAction(),
   ); */

   const categoriesMap = useMemo(
      () => new Map(categories.map((c) => [c.id, c])),
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
               expandedIds={expandedIds}
               pathname={pathname}
            />
         ))}
      </SidebarMenu>
   );
}

type CategoryTreeItemProps = {
   category: CategoryWithRelations;
   parentPath: string;
   depth: number;
   categoriesMap: Map<string, CategoryWithRelations>;
   expandedIds: Set<string>;
   pathname: string;
};

function CategoryTreeItem({
   category,
   parentPath,
   depth,
   categoriesMap,
   expandedIds,
   pathname,
}: CategoryTreeItemProps) {
   const href = `${parentPath}/${category.slug}`;
   const isActive = pathname === href;

   // Enfants de cette catégorie : relations où elle EST le parent -> r.childId
   const children = category.parentRelations
      .map((r) => categoriesMap.get(r.childId))
      .filter((c): c is CategoryWithRelations => !!c);

   const hasChildren = children.length > 0;
   const isOpen = expandedIds.has(category.id);

   const button = (
      <SidebarMenuButton
         asChild
         isActive={isActive}
         style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
         <Link href={href}>
            <span className={cn(depth === 0 && "font-bold")}>
               {category.name}
            </span>
         </Link>
      </SidebarMenuButton>
   );

   if (!hasChildren) {
      return <SidebarMenuItem>{button}</SidebarMenuItem>;
   }

   return (
      <Collapsible defaultOpen={isOpen} className="group/collapsible w-full">
         <SidebarMenuItem className="flex flex-col items-stretch">
            <div className="flex items-center">
               {button}
               <CollapsibleTrigger
                  type="button"
                  className="p-2 shrink-0 text-muted-foreground hover:text-foreground"
                  aria-label={`Déplier ${category.name}`}
               >
                  <ChevronRight className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
               </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
               {children.map((child) => (
                  <CategoryTreeItem
                     key={child.id}
                     category={child}
                     parentPath={href}
                     depth={depth + 1}
                     categoriesMap={categoriesMap}
                     expandedIds={expandedIds}
                     pathname={pathname}
                  />
               ))}
            </CollapsibleContent>
         </SidebarMenuItem>
      </Collapsible>
   );
}
