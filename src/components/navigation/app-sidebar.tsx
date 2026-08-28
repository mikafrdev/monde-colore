"use client";

import { useTransition } from "react";
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
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
   SidebarSeparator,
   useSidebar,
} from "@/components/ui/sidebar";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, User2, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CategoryTreeMenu } from "./category-tree-menu";
import { CategoryWithRelations } from "@/lib/queries/category.types";
import { useActiveSection } from "./hooks/use-active-section";
import { useNavSections } from "./nav-sections-provider";

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

   if (pathname === "/") return null;

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
                           <Collapsible
                              key={section.id}
                              defaultOpen={activeSection.id === section.id}
                           >
                              <SidebarMenuItem>
                                 <SidebarMenuButton
                                    asChild
                                    isActive={activeSection.id === section.id}
                                    className="py-5"
                                 >
                                    <Link
                                       href={section.href}
                                       onClick={closeOnMobile}
                                    >
                                       {section.icon && (
                                          <section.icon className="primary" />
                                       )}
                                       <span>{section.label}</span>
                                    </Link>
                                 </SidebarMenuButton>
                                 <CollapsibleTrigger>
                                    <SidebarMenuAction
                                       className="transition-transform group-data-[state=open]/collapsible:rotate-180"
                                       asChild
                                    >
                                       <ChevronDown />
                                    </SidebarMenuAction>
                                 </CollapsibleTrigger>
                                 <CollapsibleContent>
                                    <CategoryTreeMenu
                                       categories={categories}
                                       rootSlug={section.id}
                                    />
                                 </CollapsibleContent>
                              </SidebarMenuItem>
                           </Collapsible>
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

         {/* SidebarFooter inchangé */}
      </Sidebar>
   );
}
