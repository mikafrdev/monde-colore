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
import { useIsMobile } from "@/hooks/use-mobile";
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

export function RightColumn({ session }: AppSidebarProps) {
   const isMobile = useIsMobile();
   const { setOpenMobile } = useSidebar();

   return (
      <section className="hidden lg:block w-80 shrink-0 border-l-2 border-l-secondary">
         {isMobile ? (
            <div>Mobile</div>
         ) : (
            <div>Desktop</div>
         )}
      </section>
   );
}
