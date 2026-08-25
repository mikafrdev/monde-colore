import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import Image from "next/image";

export default async function Musiques() {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   return (
      <div>
         <div className="flex flex-col flex-1 gap-6">
            <h1 className="">Musiques</h1>
         </div>

         <Image
            loading="eager"
            src="/uploads/images/0x1900-000000-80-0-0.jpg"
            alt="Musiques"
            width={1050}
            height={605}
            className=""
         />

         <ScrollToTopButton />
      </div>
   );
}
