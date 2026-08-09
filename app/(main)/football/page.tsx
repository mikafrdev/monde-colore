import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import SubCategoryList from "@main/components/sub-category-list";
import Image from "next/image";

type footballListType = {
   title: string;
   url: string;
   alt: string;
   link: string;
};

export default async function Football() {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   const footballTypeList: footballListType[] = [
      {
         title: "Les équipes",
         url: "5ac30f92-3a02-470b-8765-ce3a11b1d2b0.png",
         alt: "Équipes de football",
         link: "/football/equipes",
      },
      {
         title: "Les joueurs",
         url: "3d3b4410-f2ae-4bbe-84bc-45722cb25ba7.png",
         alt: "Les joueurs de football",
         link: "/football/joueurs",
      },
   ];

   return (
      <div>
         <div className="flex flex-col flex-1 gap-6">
            <h1 className="">Football</h1>
            <Image
               loading="eager"
               src="/uploads/images/d46c9c70-6264-478a-9dba-9ad335fa1e28.png"
               alt="Football"
               width={1050}
               height={605}
               className=""
            />
            {/* <AppCarousel />
            <AppFeatured pageType="LEO" /> */}
         </div>

         <SubCategoryList dataList={footballTypeList} />

         <ScrollToTopButton />
      </div>
   );
}
