import { ScrollToTopButton } from "@/components/scroll-to-top-button";

export default async function Musiques() {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   return (
      <div>
         <div className="flex flex-col flex-1 gap-6">
            <h1 className="">Musiques</h1>
         </div>

         <ScrollToTopButton />
      </div>
   );
}
