import { AppCarousel } from "@/components/app-carousel";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { AppFeatured } from "@main/components/app-featured";
import Image from "next/image";

export default async function JeuxVideo() {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   return (
      <div>
         <div className="flex flex-col flex-1 gap-6">
            <h1 className="">Les consoles</h1>
            <Image
               loading="eager"
               src="/uploads/images/786e3629-778b-4272-a0af-2b1a87540e9c.jpg"
               alt="Les consoles"
               width={1050}
               height={605}
               className=""
            />
            {/* <AppCarousel />
            <AppFeatured pageType="LEO" /> */}
         </div>

         <ScrollToTopButton />
      </div>
   );
}
