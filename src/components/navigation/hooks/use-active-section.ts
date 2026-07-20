"use client";

import { usePathname } from "next/navigation";
import { getActiveSection, navigationSections } from "../navigation-config";

export function useActiveSection() {
   const pathname = usePathname();
   return getActiveSection(pathname) ?? navigationSections[0];
}
