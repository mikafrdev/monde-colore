import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { gameListType } from "@/types/game";
import { Gallery } from "@main/components/gallery";
import JeuxVideoList from "@main/components/jeuxvideo-list";

export default async function JeuxVideo() {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   const gameList: gameListType[] = [
      {
         title: "Super Mario Bros.",
         url: "bf7d25fe-0111-45c2-b4fe-a11ae14e0915.webp",
         alt: "Super Mario Bros.",
      },
      {
         title: "Super Mario 2",
         url: "9f67f653-f9be-45d8-bfd7-9b4744c4154d.webp",
         alt: "Super Mario 2",
      },
      {
         title: "Super Mario 3",
         url: "e7629fb5-ac20-4192-8329-8d653f3023de.webp",
         alt: "Super Mario 3",
      },
      {
         title: "Super Mario World",
         url: "155413c0-0107-4602-bd4c-1101a74531fe.webp",
         alt: "Super Mario World",
      },
      {
         title: "Zelda",
         url: "ee309ad5-0cbb-48d1-99f7-ba204514d9da.jpg",
         alt: "Zelda",
      },
      {
         title: "Zelda 2",
         url: "e0b1e36a-08cf-4952-85ca-a50013e00aae.webp",
         alt: "Zelda 2",
      },
      {
         title: "Zelda 3",
         url: "da7a2909-bbec-4d58-ae45-d8df94f85ad6.jpg",
         alt: "Zelda 3",
      },
   ];
   return (
      <div>
         <div className="flex flex-col flex-1 gap-6">
            <h1 className="">Les jeux</h1>
            <div className="relative w-full h-64 min-h-64 overflow-hidden shadow-md">
               <Gallery
                  images={[
                     {
                        src: "/uploads/images/a77417c2-52ff-49bc-b749-8e4c18fc9d41.jpg",
                     },
                  ]}
               />
               {/*  */}
            </div>
         </div>
         <JeuxVideoList gameList={gameList} />

         <ScrollToTopButton />
      </div>
   );
}
