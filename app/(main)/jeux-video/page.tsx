import { AppCarousel } from "@/components/app-carousel";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { AppFeatured } from "@main/components/app-featured";

export default async function JeuxVideo() {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   return (
      <div>
         <div className="flex flex-col flex-1 gap-6">
            <h1 className="">Jeux Vidéos</h1>
            <AppCarousel />
            <AppFeatured pageType="LEO" />
         </div>

         <ScrollToTopButton />
      </div>
   );
}
