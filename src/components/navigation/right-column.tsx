"use client";

import { useIsMobile } from "@/hooks/use-mobile";

export function RightColumn() {
   const isMobile = useIsMobile();

   return (
      <section className="hidden lg:block w-64 shrink-0 border-l-2 border-l-secondary">
         {isMobile ? <div>Mobile</div> : <div>Desktop</div>}
      </section>
   );
}
