"use client";

import { useState, useTransition } from "react";
import type { Session } from "@/lib/auth";

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuAction,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
   SidebarSeparator,
} from "@/components/ui/sidebar";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, User2, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CategoryTreeMenu } from "./category-tree-menu";
import type { CategoryWithRelations } from "@/lib/queries/category.types";
import { useActiveSection } from "./hooks/use-active-section";
import { useNavSections } from "./nav-sections-provider";
import type { NavSection } from "./navigation-config";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
   session: Session | null;
   categories: CategoryWithRelations[];
}

export function AppSidebar({ session, categories }: AppSidebarProps) {
   const sections = useNavSections();
   const activeSection = useActiveSection(sections);
   const [isPending] = useTransition();
   const { isMobile, setOpenMobile } = useSidebar();
   const pathname = usePathname();

   const closeOnMobile = () => isMobile && setOpenMobile(false);
   const isHome = activeSection.id === "home";

   return (
      <Sidebar
         collapsible={isMobile ? "offcanvas" : "none"}
         className="bg-sidebar border-r-2 border-r-secondary"
      >
         <SidebarContent>
            {isMobile ? (
               <SidebarGroup>
                  <SidebarMenu>
                     {sections
                        .filter((s) => s.id !== "home")
                        .map((section) => (
                           <MobileSectionItem
                              key={section.id}
                              section={section}
                              isActive={activeSection.id === section.id}
                              categories={categories}
                              closeOnMobile={closeOnMobile}
                           />
                        ))}
                  </SidebarMenu>
               </SidebarGroup>
            ) : (
               <SidebarGroup>
                  <SidebarGroupLabel className="px-3 text-xs uppercase tracking-wide text-muted-foreground">
                     {activeSection.label}
                  </SidebarGroupLabel>

                  <div className="mt-2">
                     {isHome ? null : (
                        <CategoryTreeMenu
                           categories={categories}
                           rootSlug={activeSection.id}
                        />
                     )}
                  </div>
               </SidebarGroup>
            )}

            <SidebarSeparator className="my-5" />
         </SidebarContent>

         <SidebarFooter>
            <SidebarMenu>
               <SidebarMenuItem>
                  {session ? (
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <SidebarMenuButton size="lg" disabled={isPending}>
                              <Avatar className="h-8 w-8 rounded-lg">
                                 <AvatarImage
                                    src={session.user.image ?? undefined}
                                    alt={session.user.name ?? "Avatar"}
                                 />
                                 <AvatarFallback className="rounded-lg">
                                    {session.user.name
                                       ?.slice(0, 2)
                                       .toUpperCase()}
                                 </AvatarFallback>
                              </Avatar>
                              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                                 <span className="truncate font-semibold">
                                    {session.user.name}
                                 </span>
                                 <span className="truncate text-xs text-muted-foreground">
                                    {session.user.email}
                                 </span>
                              </div>
                              {isPending ? (
                                 <Loader2 className="ml-auto animate-spin size-4" />
                              ) : (
                                 <ChevronDown className="ml-auto size-4" />
                              )}
                           </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent />
                     </DropdownMenu>
                  ) : (
                     <SidebarMenuButton asChild className="py-6">
                        <Link href="/auth" onClick={closeOnMobile}>
                           <User2 className="size-5" />
                           <span className="font-medium">Se connecter</span>
                        </Link>
                     </SidebarMenuButton>
                  )}
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarFooter>
      </Sidebar>
   );
}

function MobileSectionItem({
   section,
   isActive,
   categories,
   closeOnMobile,
}: {
   section: NavSection;
   isActive: boolean;
   categories: CategoryWithRelations[];
   closeOnMobile: () => void;
}) {
   const [open, setOpen] = useState(isActive);

   const rootCategory = categories.find(
      (c) => c.slug === section.id && c.childRelations.length === 0,
   );
   const hasChildren = rootCategory
      ? rootCategory.parentRelations.length > 0
      : false;

   console.log(`DEBUG ${section.id} parentRelations:`, rootCategory?.parentRelations);

   // Cas simple : pas d'enfants -> juste le titre, sans chevron ni Collapsible
   if (!hasChildren) {
      return (
         <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive} className="py-5">
               <Link href={section.href} onClick={closeOnMobile}>
                  {section.icon && <section.icon className="primary" />}
                  <span>{section.label}</span>
               </Link>
            </SidebarMenuButton>
         </SidebarMenuItem>
      );
   }

   // Cas avec enfants : version complète avec chevron + Collapsible (ton code original)
   return (
      <Collapsible open={open} onOpenChange={setOpen}>
         <SidebarMenuItem className="flex flex-col items-stretch">
            <div className="flex items-center gap-0.5">
               <div className="min-w-0 flex-1">
                  <SidebarMenuButton
                     asChild
                     isActive={isActive}
                     className="py-5"
                  >
                     <Link href={section.href} onClick={closeOnMobile}>
                        {section.icon && <section.icon className="primary" />}
                        <span>{section.label}</span>
                     </Link>
                  </SidebarMenuButton>
               </div>

               <CollapsibleTrigger
                  type="button"
                  className={cn(
                     "flex shrink-0 items-center justify-center rounded-md p-1.5 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  )}
                  aria-label={
                     open
                        ? `Replier ${section.label}`
                        : `Déplier ${section.label}`
                  }
               >
                  <ChevronRight
                     className={cn(
                        "size-5 transition-transform duration-200",
                        open && "rotate-90",
                     )}
                  />
               </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
               <CategoryTreeMenu
                  categories={categories}
                  rootSlug={section.id}
                  onNavigate={closeOnMobile}
               />
            </CollapsibleContent>
         </SidebarMenuItem>
      </Collapsible>
   );
}
