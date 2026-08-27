"use client";

import { usePathname } from "next/navigation";
import { getActiveSection } from "../navigation-config";
import type { NavSection } from "../navigation-config";

export function useActiveSection(sections: readonly NavSection[]) {
   const pathname = usePathname();
   return getActiveSection(pathname, sections) ?? sections[0];
}
