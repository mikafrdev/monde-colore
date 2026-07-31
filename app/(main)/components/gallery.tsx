"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

export function Gallery({ images }: { images: { src: string }[] }) {
   const [index, setIndex] = useState(-1);

   return (
      <>
         <div className="absolute inset-0 flex">
        {images.map((img, i) => (
          <div key={i} className="relative w-full flex-shrink-0 overflow-hidden">
            <Image
              fill
              src={img.src}
              onClick={() => setIndex(i)}
              className="object-cover cursor-zoom-in animate-pan-vertical"
              alt=""
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        ))}
      </div>



         <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={images}
            render={
               images.length <= 1
                  ? { buttonPrev: () => null, buttonNext: () => null }
                  : undefined
            }
         />
      </>
   );
}
