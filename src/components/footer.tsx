"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function Footer() {
   const [size, setSize] = useState({ width: 0, height: 0 });

   useEffect(() => {
      function updateSize() {
         setSize({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      }

      updateSize(); // valeur initiale
      window.addEventListener("resize", updateSize);

      return () => window.removeEventListener("resize", updateSize);
   }, []);
   return (
      <footer className="relative flex flex-col gap-4 items-center mt-6 py-8">
         <div className="flex items-center mx-auto">
            <Link href="/" className="text-[#3c57dd] text-xl">
               Le site de Léo
            </Link>
         </div>
         <span className="text-xs text-gray-500">@2026 Le site de Léo</span>
         <p>
            Résolution actuelle : {size.width} x {size.height} px
         </p>

         <a
            href="#top"
            aria-label="Remonter en haut"
            className={cn(
               buttonVariants({ size: "icon" }),
               "fixed bottom-6 right-6 z-50 rounded-full shadow-lg",
            )}
         >
            <ArrowUp className="h-4 w-4" />
         </a>
      </footer>
   );
}
