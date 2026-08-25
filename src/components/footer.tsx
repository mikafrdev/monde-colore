import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
   return (
      <footer className="relative flex flex-col gap-4 items-center mt-6 py-8">
         <div className="flex items-center mx-auto">
            <Link href="/" className="text-[#3c57dd] text-xl">
               Le site de Léo
            </Link>
         </div>
         <span className="text-xs text-gray-500">@2026 Le site de Léo</span>

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
