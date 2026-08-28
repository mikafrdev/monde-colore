import type { LucideIcon } from "lucide-react";
import {
   Gamepad2,
   Video,
   Image as ImageIcon,
   Music,
   Home,
   Volleyball,
   Newspaper,
   Utensils,
} from "lucide-react";

import type { CategoryWithRelations } from "@/lib/queries/category.types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SidebarLink = {
   readonly id: string;
   readonly label: string;
   readonly href: string;
   readonly icon: LucideIcon;
   readonly description?: string;
};

type BaseSection = {
   readonly id: string;
   /** Libellé utilisé dans la sidebar (desktop + mobile) */
   readonly label: string;
   /** Libellé utilisé dans la navbar. Fallback sur `label` si absent. */
   readonly navLabel?: string;
   readonly href: string;
   readonly icon?: LucideIcon;
   /** Matcher custom, sinon fallback sur un startsWith(href) */
   readonly matcher?: (pathname: string) => boolean;
   /** Items affichés dans la sidebar quand cette section est active (legacy, non utilisé pour les sections dynamiques) */
   readonly sidebar: readonly SidebarLink[];
};

export type NavSection =
   | (BaseSection & { type: "link" })
   | (BaseSection & {
        type: "dropdown";
        dropdownItems: readonly SidebarLink[];
     });

// ---------------------------------------------------------------------------
// Sections statiques (hors catégories)
// ---------------------------------------------------------------------------

// Sections 100% statiques, hors catégories (Home, et plus tard /jeux-videos si base dédiée)
export const staticSections: readonly NavSection[] = [
   {
      id: "home",
      label: "Accueil",
      navLabel: "Home",
      href: "/",
      type: "link",
      icon: Home,
      matcher: (p) => p === "/",
      sidebar: [],
   },
] as const;

// ---------------------------------------------------------------------------
// Sections dynamiques (générées depuis les catégories racines en BDD)
// ---------------------------------------------------------------------------

// Mapping slug -> icône, en attendant un champ `icon` en base
const categoryIconMap: Record<string, LucideIcon> = {
   "jeux-video": Gamepad2,
   football: Volleyball,
   cuisine: Utensils,
   videos: Video,
   images: ImageIcon,
   musique: Music,
};

export function buildCategorySections(
   rootCategories: CategoryWithRelations[],
): NavSection[] {
   return rootCategories.map((cat) => ({
      id: cat.slug,
      label: cat.name,
      href: `/articles/${cat.slug}`,
      type: "link" as const,
      icon: categoryIconMap[cat.slug] ?? Newspaper,
      matcher: (p: string) =>
         p.startsWith(`/articles/${cat.slug}`) ||
         p.startsWith(`/article/${cat.slug}/`),
      sidebar: [], // non utilisé, CategoryTreeMenu prend le relais
   }));
}

// ---------------------------------------------------------------------------
// Résolution de la section active
// ---------------------------------------------------------------------------

export function getActiveSection(
   pathname: string,
   sections: readonly NavSection[],
): NavSection | undefined {
   return (
      sections.find((s) => s.matcher?.(pathname)) ??
      [...sections]
         .filter((s) => s.href !== "/" && pathname.startsWith(s.href))
         .sort((a, b) => b.href.length - a.href.length)[0]
   );
}
