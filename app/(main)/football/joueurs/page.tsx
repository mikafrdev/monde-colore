import { AppCarousel } from "@/components/app-carousel";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { AppFeatured } from "@main/components/app-featured";
import Image from "next/image";

export default async function Football() {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   return (
      <div>
         <div className="flex flex-col flex-1 gap-6">
            <h1 className="">Les joueurs</h1>
            <Image
               loading="eager"
               src="/uploads/images/artboard_1_720.webp"
               alt="Football"
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
