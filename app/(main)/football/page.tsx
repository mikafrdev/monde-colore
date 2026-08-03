import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import Image from "next/image";
import Br4x3Icon from '@iconify-react/flag/br-4x3';

export default async function Football() {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   return (
      <div>
         <Br4x3Icon height="1em" />
         <div className="flex flex-col flex-1 gap-6">
            <h1 className="">Football</h1>
            <Image
               loading="eager"
               src="/uploads/images/artboard_1_720.webp"
               alt="Football"
               width={1050}
               height={605}
               className=""
            />
         </div>

         <ScrollToTopButton />
      </div>
   );
}
