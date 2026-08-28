// nav-sections-provider.tsx
"use client";

import { createContext, useContext, useMemo } from "react";
import {
   staticSections,
   buildCategorySections,
   type NavSection,
} from "./navigation-config";
import type { CategoryWithRelations } from "@/lib/queries/category.types";

const NavSectionsContext = createContext<readonly NavSection[]>([]);

export function NavSectionsProvider({
   categories,
   children,
}: {
   categories: CategoryWithRelations[];
   children: React.ReactNode;
}) {
   const sections = useMemo(() => {
      const rootCategories = categories.filter(
         (c) => c.childRelations.length === 0,
      );
      return [...staticSections, ...buildCategorySections(rootCategories)];
   }, [categories]);

   return (
      <NavSectionsContext.Provider value={sections}>
         {children}
      </NavSectionsContext.Provider>
   );
}

export function useNavSections() {
   return useContext(NavSectionsContext);
}
