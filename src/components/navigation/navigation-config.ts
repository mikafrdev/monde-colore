import type { LucideIcon } from "lucide-react";
import { Gamepad2, Video, Image as ImageIcon, Music, Home } from "lucide-react";

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

const homeSidebar: readonly SidebarLink[] = [
   {
      id: "home",
      label: "Accueil",
      href: "/",
      icon: Home,
      description: "Page d'accueil",
   },
   {
      id: "videos",
      label: "Vidéos",
      href: "/videos",
      icon: Video,
      description: "Toutes les vidéos",
   },
   {
      id: "images",
      label: "Images",
      href: "/images",
      icon: ImageIcon,
      description: "Toutes les images",
   },
   {
      id: "music",
      label: "Musique",
      href: "/musiques",
      icon: Music,
      description: "Les chansons de Léo",
   },
   {
      id: "games",
      label: "Jeux vidéo",
      href: "/jeux-video",
      icon: Gamepad2,
      description: "jeux vidéo de Léo",
   },
] as const;

const jeuxvideoSidebar: readonly SidebarLink[] = [
   {
      id: "consoles",
      label: "Les consoles",
      href: "/",
      icon: Home,
      description: "Les consoles de jeux vidéo",
   },
   {
      id: "videos",
      label: "Les jeux",
      href: "/videos",
      icon: Video,
      description: "Toutes les vidéos",
   },
   {
      id: "images",
      label: "Images",
      href: "/images",
      icon: ImageIcon,
      description: "Toutes les images",
   },
   {
      id: "music",
      label: "Musique",
      href: "/musiques",
      icon: Music,
      description: "Les chansons de Léo",
   },
   {
      id: "games",
      label: "Jeux vidéo",
      href: "/jeux-video",
      icon: Gamepad2,
      description: "jeux vidéo de Léo",
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
      sidebar: homeSidebar,
   },
   {
      id: "videos",
      label: "Vidéos",
      href: "/videos",
      type: "link",
      icon: Video,
      matcher: (p) => p.startsWith("/videos"),
      sidebar: [],
   },
   {
      id: "images",
      label: "Images",
      href: "/images",
      type: "link",
      icon: ImageIcon,
      matcher: (p) => p.startsWith("/images"),
      sidebar: [],
   },
   {
      id: "music",
      label: "Musique",
      href: "/musiques",
      type: "link",
      icon: Music,
      matcher: (p) => p.startsWith("/musiques"),
      sidebar: [],
   },
   {
      id: "games",
      label: "Jeux vidéo",
      href: "/jeux-video",
      type: "link",
      icon: Gamepad2,
      matcher: (p) => p.startsWith("/jeux-video"),
      sidebar: jeuxvideoSidebar,
   },
] as const;

export function getActiveSection(pathname: string): NavSection | undefined {
   return (
      navigationSections.find((s) => s.matcher?.(pathname)) ??
      [...navigationSections]
         .filter((s) => s.href !== "/" && pathname.startsWith(s.href))
         .sort((a, b) => b.href.length - a.href.length)[0]
   );
}
