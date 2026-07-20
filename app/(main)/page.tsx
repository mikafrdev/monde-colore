import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import HomeFeature from "@main/components/home-feature";
import HomeFeatureNavigation from "@main/components/home-feature-navigation";

export default async function Home() {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   return (
      <div>
         <div className="flex flex-col flex-1 gap-6">
            <h1 className="hidden">Accueil Léo</h1>
            <HomeFeature />
         </div>
         <div className="p-4">
            <HomeFeatureNavigation />
         </div>
         <ScrollToTopButton />
      </div>
   );
}
