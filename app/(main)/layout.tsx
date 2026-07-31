import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { AppNavigationMenu } from "@/components/navigation/app-navigation-menu";
import { AppBreadcrumb } from "@/components/app-breadcrumb";
import type { LayoutProps } from "@/types/app";
import { RightColumn } from "@/components/navigation/right-column";

export default async function MainLayout({ children }: LayoutProps) {
   const session = await auth.api.getSession({ headers: await headers() });

   return (
      <SidebarProvider defaultOpen>
         <div className="flex flex-col min-h-screen w-full">
            <header className="sticky w-full top-0 z-50 backdrop-blur-md bg-background">
               <AppNavigationMenu
                  trigger={<SidebarTrigger className="px-0 md:hidden" />}
                  session={session}
               />
            </header>
            <div className="flex">
               <AppSidebar session={session} />
               <main className="flex-1">
                  <AppBreadcrumb />
                  {children}
               </main>
               <RightColumn session={session} />
            </div>
         </div>
      </SidebarProvider>
   );
}
