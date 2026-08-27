"use client";

import type { Session } from "@/lib/auth";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
   navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import AppUserMenu from "@auth/components/app-user-menu";
import type { NavSection } from "@/components/navigation/navigation-config";
import { useActiveSection } from "./hooks/use-active-section";

type AppNavigationMenuProps = {
   session: Session | null;
   trigger?: React.ReactNode;
   sections: readonly NavSection[];
};

export function AppNavigationMenu({
   session,
   trigger,
   sections,
}: AppNavigationMenuProps) {
   const pathname = usePathname();
   const activeSection = useActiveSection(sections);

   return (
      <div className="flex items-center justify-between w-full p-4 border-b-4 border-b-secondary">
         {trigger}

         <div className="flex flex-col justify-center items-center align-middle">
            <Link
               href="/"
               className="text-center text-primary text-xl font-semibold"
            >
               Le monde de Léo
            </Link>
         </div>

         <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-2">
               {sections.map((section) => {
                  const isActive = activeSection.id === section.id;

                  if (section.type === "dropdown") {
                     return (
                        <NavigationMenuItem key={section.id}>
                           <NavigationMenuTrigger
                              className={cn(
                                 navigationMenuTriggerStyle(),
                                 isActive && "bg-accent",
                              )}
                           >
                              {section.navLabel ?? section.label}
                           </NavigationMenuTrigger>
                           <NavigationMenuContent>
                              <ul className="w-96 space-y-1">
                                 {section.dropdownItems?.map((sub) => (
                                    <ListItem
                                       key={sub.id}
                                       href={sub.href}
                                       title={sub.label}
                                    >
                                       {sub.description}
                                    </ListItem>
                                 ))}
                              </ul>
                           </NavigationMenuContent>
                        </NavigationMenuItem>
                     );
                  }

                  return (
                     <NavigationMenuItem key={section.id}>
                        <NavigationMenuLink
                           asChild
                           className={cn(
                              navigationMenuTriggerStyle(),
                              (isActive || pathname === section.href) &&
                                 "bg-sidebar-primary p-7",
                           )}
                        >
                           <Link
                              href={section.href}
                              className="flex flex-col items-center"
                           >
                              {section.icon && (
                                 <section.icon className="h-4 w-4 shrink-0 text-primary" />
                              )}
                              <span className="font-bold">
                                 {section.navLabel ?? section.label}
                              </span>
                           </Link>
                        </NavigationMenuLink>
                     </NavigationMenuItem>
                  );
               })}
            </NavigationMenuList>
         </NavigationMenu>

         <div className="flex items-center gap-3">
            <ModeToggle />
            <AppUserMenu session={session} />
         </div>
      </div>
   );
}

function ListItem({
   title,
   children,
   href,
   ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
   return (
      <li {...props}>
         <NavigationMenuLink asChild>
            <Link href={href}>
               <div className="flex flex-col gap-1 text-sm">
                  <div className="leading-none font-medium">{title}</div>
                  <div className="line-clamp-2 text-muted-foreground">
                     {children}
                  </div>
               </div>
            </Link>
         </NavigationMenuLink>
      </li>
   );
}
