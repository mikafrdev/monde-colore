import type { LucideIcon } from "lucide-react";
import {
   Gamepad2,
   Video,
   Image as ImageIcon,
   Music,
   Home,
   Volleyball,
   PersonStanding,
   Newspaper,
   Utensils,
} from "lucide-react";

import type { CategoryWithRelations } from "@/lib/queries/category.types";

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
      sidebar: [], // plus utilisé, CategoryTreeMenu prend le relais
   }));
}

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
   /** Items affichés dans la sidebar quand cette section est active */
   readonly sidebar: readonly SidebarLink[];
};

export type NavSection =
   | (BaseSection & { type: "link" })
   | (BaseSection & {
        type: "dropdown";
        dropdownItems: readonly SidebarLink[];
     });

const jeuxvideoSidebar: readonly SidebarLink[] = [
   {
      id: "consoles",
      label: "Les consoles",
      href: "/jeux-video/consoles",
      icon: Home,
      description: "Les consoles de jeux vidéo",
   },
   {
      id: "videos",
      label: "Les jeux",
      href: "/jeux-video/jeux",
      icon: Video,
      description: "Toutes les vidéos",
   },
   /* {
      id: "personnages",
      label: "Personnages",
      href: "/personnages",
      icon: ImageIcon,
      description: "Les personnages de jeux vidéo",
   } */
] as const;

const footballSidebar: readonly SidebarLink[] = [
   {
      id: "equipes",
      label: "Les équipes",
      href: "/football/equipes",
      icon: Home,
      description: "Les équipes de football",
   },
   {
      id: "joueurs",
      label: "Les joueurs",
      href: "/football/joueurs",
      icon: PersonStanding,
      description: "Tous les joueurs de football",
   },
] as const;

export const navigationSections: readonly NavSection[] = [
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
   {
      id: "articles",
      label: "Articles",
      href: "/articles",
      type: "link",
      icon: Newspaper,
      matcher: (p) => p.startsWith("/articles"),
      sidebar: [],
   },
   {
      id: "games",
      label: "Jeux vidéo",
      href: "/articles/jeux-video",
      type: "link",
      icon: Gamepad2,
      matcher: (p) => p.startsWith("/articles/jeux-video"),
      sidebar: jeuxvideoSidebar,
   },
   {
      id: "football",
      label: "Football",
      href: "/articles/football",
      type: "link",
      icon: Volleyball,
      matcher: (p) => p.startsWith("/articles/football"),
      sidebar: footballSidebar,
   },
   {
      id: "cuisine",
      label: "cuisine",
      href: "/articles/cuisine",
      type: "link",
      icon: Utensils,
      matcher: (p) => p.startsWith("/articles/cuisine"),
      sidebar: [],
   },
   {
      id: "videos",
      label: "Vidéos",
      href: "/articles/videos",
      type: "link",
      icon: Video,
      matcher: (p) => p.startsWith("/articles/videos"),
      sidebar: [],
   },
   {
      id: "images",
      label: "Images",
      href: "/articles/images",
      type: "link",
      icon: ImageIcon,
      matcher: (p) => p.startsWith("/articles/images"),
      sidebar: [],
   },
   {
      id: "music",
      label: "Musique",
      href: "/articles/musique",
      type: "link",
      icon: Music,
      matcher: (p) => p.startsWith("/articles/musique"),
      sidebar: [],
   },
] as const;
