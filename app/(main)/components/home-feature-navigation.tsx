import { ChevronRight, Gamepad2, ImageIcon, Play } from "lucide-react";
import Image from "next/image";
import HomeNavigationCard from "./home-navigation-card";

export default async function HomeFeatureNavigation() {
   const navigation = [
      {
         icon: <Play className="size-10" />,
         title: "Vidéos",
         description: "Regarde les dessins animés et films préférés",
      },
      {
         icon: <Gamepad2 className="size-10" />,
         title: "Jeux",
         description: "Retrouve tes jeux préférés et découvre de nouveaux jeux",
      },
      {
         icon: <ImageIcon className="size-10" />,
         title: "Photos",
         description:
            "Explore ta collection d'images et découvre de nouvelles photos",
      },
      {
         icon: <ChevronRight className="size-10" />,
         title: "",
         description: "Bientôt de nouvelles surprises ...",
      },
   ];

   return (
      <section>
         <h2>Où veux tu aller ?</h2>
         <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr gap-6">
            {navigation.map((item, index) => {
               const isLast = index === navigation.length - 1;

               return (
                  <HomeNavigationCard
                     key={index}
                     icon={item.icon}
                     title={item.title}
                     description={item.description}
                     isLast={isLast}
                  />
               );
            })}
         </div>
      </section>
   );
}
