// use-nav-sections.ts
"use client";

import { useMemo } from "react";
import type { CategoryWithRelations } from "@/lib/queries/category.types";
import { buildCategorySections, staticSections } from "../navigation-config";

export function useNavSections(categories: CategoryWithRelations[]) {
   return useMemo(() => {
      const rootCategories = categories.filter(
         (c) => c.childRelations.length === 0,
      );
      return [...staticSections, ...buildCategorySections(rootCategories)];
   }, [categories]);
}
