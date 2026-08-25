import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { AppNavigationMenu } from "@/components/navigation/app-navigation-menu";
import type { LayoutProps } from "@/types/app";
import { RightColumn } from "@/components/navigation/right-column";
import { getCategoriesBySiteAction } from "@/lib/queries/categorie.queries";
import { CURRENT_SITE } from "@/lib/site";
import Footer from "@/components/footer";

export default async function MainLayout({ children }: LayoutProps) {
   const [session, categories] = await Promise.all([
      auth.api.getSession({ headers: await headers() }),
      getCategoriesBySiteAction(CURRENT_SITE),
   ]);

   return (
      <SidebarProvider defaultOpen>
         <div className="flex flex-col h-svh w-full overflow-hidden">
            <header className="w-full z-50 backdrop-blur-md bg-background shrink-0">
               <AppNavigationMenu
                  trigger={
                     <SidebarTrigger className="cursor-pointer px-0 md:hidden" />
                  }
                  session={session}
               />
            </header>
            <div className="flex flex-1 min-h-0">
               <AppSidebar session={session} categories={categories} />
               <main
                  id="main-scroll"
                  className="flex-1 overflow-y-auto scroll-smooth"
               >
                  <div id="top" />
                  {children}
                  <Footer />
               </main>
               <RightColumn />
            </div>
         </div>
      </SidebarProvider>
   );
}
