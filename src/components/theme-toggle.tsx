"use client";

import { Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
   const { setTheme } = useTheme();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Button variant="ghost" size="icon">
               {/* <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
               <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" /> */}
               <Palette
                  className="h-[1.2rem] w-[1.2rem] transition-all duration-300"
                  style={{
                     color: "var(--primary)",
                     /* filter: "drop-shadow(0 0 6px var(--theme-icon-shadow))", */
                  }}
               />
               <span className="sr-only">Toggle theme</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-auto min-w-0 p-2">
            {["perso", "cosmic-night-dark", "cosmic-night-light", "dark", "system"].map(
               (theme) => (
                  <DropdownMenuItem
                     key={theme}
                     onClick={() => setTheme(theme)}
                  >
                     {theme
                        .split("-")
                        .map((w) => w[0].toUpperCase() + w.slice(1))
                        .join(" ")}
                  </DropdownMenuItem>
               ),
            )}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
