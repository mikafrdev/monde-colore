"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

type heroImageSrc = {
   heroImageSrc: string;
};

export function HeroImage({ heroImageSrc }: heroImageSrc) {
   const [index, setIndex] = useState(-1);

   return (
      <>
         <div className="absolute inset-0 flex">
            <div className="relative w-full shrink-0 overflow-hidden">
               <Image
                  loading="eager"
                  fill
                  src={heroImageSrc}
                  className="object-cover cursor-zoom-in animate-pan-vertical"
                  alt=""
                  sizes="(max-width: 768px) 100vw, 800px"
               />
            </div>
         </div>

         <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            render={
               heroImageSrc.length <= 1
                  ? { buttonPrev: () => null, buttonNext: () => null }
                  : undefined
            }
         />
      </>
   );
}
