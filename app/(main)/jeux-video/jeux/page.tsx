import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { Gallery } from "@main/components/gallery";
import Image from "next/image";

export default async function JeuxVideo() {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   return (
      <div>
         <div className="flex flex-col flex-1 gap-6">
            <h1 className="">Les jeux</h1>
            <div className="relative w-full min-h-96 overflow-hidden shadow-md">
               <Gallery
                  images={[
                     {
                        src: "/uploads/images/a77417c2-52ff-49bc-b749-8e4c18fc9d41.jpg",
                     },
                  ]}
               />
               {/* <Image
                  src="/uploads/images/a77417c2-52ff-49bc-b749-8e4c18fc9d41.jpg"
                  alt="Les jeux"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover object-[center_80%] transition-transform duration-300 hover:scale-105"
               /> */}
            </div>
         </div>

         <ScrollToTopButton />
      </div>
   );
}
