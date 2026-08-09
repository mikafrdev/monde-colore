import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { gameListType } from "@/types/game";
import SubCategoryList from "@main/components/sub-category-list";
import Image from "next/image";

export default async function JeuxVideo() {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   const gameTypeList: gameListType[] = [
      {
         title: "Les jeux vidéo",
         url: "a77417c2-52ff-49bc-b749-8e4c18fc9d41.jpg",
         alt: "Jeux vidéo",
         link: "/jeux-video/jeux",
      },
      {
         title: "Les consoles",
         url: "786e3629-778b-4272-a0af-2b1a87540e9c.jpg",
         alt: "Les consoles",
         link: "/jeux-video/consoles",
      },
   ];

   return (
      <div>
         <div className="flex flex-col flex-1 gap-6">
            <h1 className="">Jeux Vidéos</h1>
            <Image
               loading="eager"
               src="/uploads/images/eabbf922-5f7e-400b-b597-48154addd48e.jpg"
               alt="Jeux Vidéos"
               width={1050}
               height={605}
               className=""
            />
            {/* <AppCarousel />
            <AppFeatured pageType="LEO" /> */}
         </div>

         <SubCategoryList dataList={gameTypeList} />

         <ScrollToTopButton />
      </div>
   );
}
