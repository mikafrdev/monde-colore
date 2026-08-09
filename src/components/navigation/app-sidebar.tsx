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

interface AppSidebarProps {
   session: Session | null;
}

export function AppSidebar({ session }: AppSidebarProps) {
   const [isPending] = useTransition();
   const { isMobile, setOpenMobile } = useSidebar();
   const pathname = usePathname();
   const activeSection = useActiveSection();

   if (pathname === "/") return null;

   const closeOnMobile = () => isMobile && setOpenMobile(false);

   return (
      <Sidebar collapsible={isMobile ? "offcanvas" : "none"} className="h-svh bg-sidebar border-r-2 border-r-secondary">
         <SidebarContent>
            {isMobile ? (
               // ---------- MOBILE : nav complète + sous-liens en accordéon ----------
               <SidebarGroup>
                  <SidebarMenu>
                     {navigationSections.map((section) => {
                        const isActiveSection = activeSection.id === section.id;
                        const children =
                           section.type === "dropdown"
                              ? section.dropdownItems
                              : section.sidebar;
                        const hasChildren = !!children?.length;

                        return (
                           <Collapsible
                              key={section.id}
                              defaultOpen={isActiveSection}
                              className="group/collapsible"
                           >
                              <SidebarMenuItem>
                                 <SidebarMenuButton
                                    asChild
                                    isActive={isActiveSection}
                                    className="py-5"
                                 >
                                    <Link
                                       href={section.href}
                                       onClick={closeOnMobile}
                                    >
                                       {section.icon && <section.icon className="primary" />}
                                       <span>{section.label}</span>
                                    </Link>
                                 </SidebarMenuButton>

                                 {hasChildren && (
                                    <CollapsibleTrigger>
                                       <SidebarMenuAction className="transition-transform group-data-[state=open]/collapsible:rotate-180" asChild>
                                          <ChevronDown />
                                       </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                 )}

                                 {hasChildren && (
                                    <CollapsibleContent>
                                       <SidebarMenuSub>
                                          {children!.map((item) => (
                                             <SidebarMenuSubItem key={item.id}>
                                                <SidebarMenuSubButton
                                                   asChild
                                                   isActive={
                                                      pathname === item.href
                                                   }
                                                >
                                                   <Link
                                                      href={item.href}
                                                      onClick={closeOnMobile}
                                                   >
                                                      {"icon" in item &&
                                                         item.icon && (
                                                            <item.icon className="text-primary" />
                                                         )}
                                                      <span>{item.label}</span>
                                                   </Link>
                                                </SidebarMenuSubButton>
                                             </SidebarMenuSubItem>
                                          ))}
                                       </SidebarMenuSub>
                                    </CollapsibleContent>
                                 )}
                              </SidebarMenuItem>
                           </Collapsible>
                        );
                     })}
                  </SidebarMenu>
               </SidebarGroup>
            ) : (
               // ---------- DESKTOP : uniquement les items de la section active ----------
               <SidebarGroup>
                  <SidebarGroupLabel className="px-3 text-xs uppercase tracking-wide text-muted-foreground">
                     {activeSection.label}
                  </SidebarGroupLabel>

                  <SidebarMenu
                     key={activeSection.id}
                     className="mt-2 animate-in fade-in slide-in-from-left-2 duration-200"
                  >
                     {activeSection.sidebar.map((item) => (
                        <SidebarMenuItem key={item.id}>
                           <SidebarMenuButton
                              asChild
                              className="px-6 py-5"
                              isActive={pathname === item.href}
                           >
                              <Link href={item.href}>
                                 <item.icon className="size-5 text-primary" />
                                 <span className="pl-3 font-bold">{item.label}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
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
