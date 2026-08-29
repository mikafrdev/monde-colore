import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { cn } from "@/lib/utils";
import HomeFeature from "@main/components/home-feature";
import HomeFeatureNavigation from "@main/components/home-feature-navigation";
import Link from "next/link";

export default async function Home() {
   const categories = [
      {
         title: "Football",
         icon: "⚽",
         href: "/articles/football",
         color: "from-green-400 to-green-600",
      },
      /* {
         title: "Musique",
         icon: "🎵",
         href: "/articles/musique",
         color: "from-purple-400 to-purple-600",
      }, */
      {
         title: "Vidéos",
         icon: "🎬",
         href: "/articles/videos",
         color: "from-red-400 to-red-600",
      },
      {
         title: "Jeux vidéo",
         icon: "🎮",
         href: "/articles/jeux-video",
         color: "from-blue-400 to-blue-600",
      },
      {
         title: "Recettes",
         icon: "🍰",
         href: "/articles/recettes",
         color: "from-yellow-400 to-orange-500",
      },
   ];
   return (
      <div className="aspect-3/2 max-md:aspect-864/1821 bg-size-[100%_auto] bg-top bg-no-repeat bg-[url('/images/bg-hp-desktop.png')] max-md:bg-[url('/images/bg-hp-mobile.png')]">
         <div className="flex flex-wrap justify-center gap-4 pt-48 px-5">
            {categories.map((category) => (
               <Link
   key={category.title}
   href={category.href}
   className={cn(
      "group flex flex-col items-center justify-between",
      "w-[calc(50%-1rem)] sm:w-40 md:w-48 lg:w-56",
      "rounded-2xl md:rounded-3xl border-2 md:border-4 border-white/80",
      "bg-linear-to-br p-3 sm:p-4 md:p-5",
      "shadow-lg transition-all duration-200",
      "hover:-translate-y-2 hover:scale-105 hover:shadow-xl",
      category.color,
   )}
>
   <span className="text-4xl sm:text-5xl md:text-6xl transition-transform group-hover:scale-110">
      {category.icon}
   </span>

   <span className="text-center text-base sm:text-lg md:text-xl font-black text-white drop-shadow">
      {category.title}
   </span>

   <span className="rounded-full bg-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-gray-700 shadow">
      Découvrir →
   </span>
</Link>
            ))}
         </div>
      </div>
   );
}
