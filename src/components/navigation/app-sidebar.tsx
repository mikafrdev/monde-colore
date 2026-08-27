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
import { useActiveSection } from "./hooks/use-active-section";
import { navigationSections } from "./navigation-config";
import { CategoryTreeMenu } from "./category-tree-menu";
import { CategoryWithRelations } from "@/lib/queries/category.types";

interface AppSidebarProps {
   session: Session | null;
   categories: CategoryWithRelations[];
}

export function AppSidebar({ session, categories }: AppSidebarProps) {
   const [isPending] = useTransition();
   const { isMobile, setOpenMobile } = useSidebar();
   const pathname = usePathname();
   const activeSection = useActiveSection();

   if (pathname === "/") return null;

   const closeOnMobile = () => isMobile && setOpenMobile(false);

   return (
      <Sidebar
         collapsible={isMobile ? "offcanvas" : "none"}
         className="bg-sidebar border-r-2 border-r-secondary"
      >
         <SidebarContent>
            {isMobile ? (
               // ---------- MOBILE : nav complète + sous-liens en accordéon ----------
               <SidebarGroup>
                  <SidebarMenu>
                     {navigationSections.map((section) => {
                        if (section.id === "articles") {
                           return (
                              <Collapsible
                                 key={section.id}
                                 defaultOpen={activeSection.id === "articles"}
                              >
                                 <SidebarMenuItem>
                                    <SidebarMenuButton
                                       asChild
                                       isActive={
                                          activeSection.id === "articles"
                                       }
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
                                       />
                                    </CollapsibleContent>
                                 </SidebarMenuItem>
                              </Collapsible>
                           );
                        }
                     })}
                  </SidebarMenu>
               </SidebarGroup>
            ) : (
               // ---------- DESKTOP : uniquement les items de la section active ----------
               <SidebarGroup>
                  <SidebarGroupLabel className="px-3 text-xs uppercase tracking-wide text-muted-foreground">
                     {activeSection.label}
                  </SidebarGroupLabel>

                  <div className="mt-2 animate-in fade-in slide-in-from-left-2 duration-200">
                     {activeSection.id === "articles" ? (
                        <CategoryTreeMenu categories={categories} />
                     ) : (
                        <SidebarMenu key={activeSection.id}>
                           {activeSection.sidebar.map((item) => (
                              <SidebarMenuItem key={item.id}>
                                 <SidebarMenuButton
                                    asChild
                                    className="px-6 py-5"
                                    isActive={pathname === item.href}
                                 >
                                    <Link href={item.href}>
                                       <item.icon className="size-5 text-primary" />
                                       <span className="pl-3 font-bold">
                                          {item.label}
                                       </span>
                                    </Link>
                                 </SidebarMenuButton>
                              </SidebarMenuItem>
                           ))}
                        </SidebarMenu>
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
