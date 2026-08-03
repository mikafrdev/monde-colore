"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

interface CarouselImage {
   url: string;
   alt?: string | null;
   label?: string | null; // ex: "Image principale"
}

interface CarouselProps {
   images: CarouselImage[];
   height?: number; // hauteur en px, défaut 288 (h-72)
   fit?: "contain" | "cover"; // défaut "contain"
   showLabel?: boolean; // afficher le label sur la première image
   priority?: boolean; // eager loading sur la première image
   className?: string;
}

export function Carousel({
   images,
   height = 288,
   fit = "contain",
   showLabel = false,
   priority = false,
   className,
}: CarouselProps) {
   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

   const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
   const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

   if (images.length === 0) return null;

   const imageClass = `object-${fit}`;

   if (images.length === 1) {
      return (

         <div className="flex justify-center">
            {/* <div
            className={`relative w-full rounded-xl overflow-hidden ${className ?? ""}`}
            style={{ height }}
         > */}

            <Image
               priority={priority}
               loading={priority ? "eager" : "lazy"}
               src={images[0].url}
               alt={images[0].alt ?? ""}
               fill
               style={{ objectFit: "contain" }}
            />
         </div>
      );
   }

   return (
      <div className={`relative w-full ${className ?? ""}`}>
         <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
               {images.map((image, index) => (
                  <div
                     key={index}
                     className="relative flex-[0_0_100%]"
                     style={{ height }}
                  >
                     <Image
                        src={image.url}
                        alt={image.alt ?? ""}
                        fill
                        className={imageClass}
                        priority={priority && index === 0}
                        loading={priority && index === 0 ? "eager" : "lazy"}
                     />
                     {showLabel && index === 0 && image.label && (
                        <span className="absolute bottom-3 left-3 text-xs bg-black/60 text-white px-2 py-1 rounded">
                           {image.label}
                        </span>
                     )}
                  </div>
               ))}
            </div>
         </div>

         <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
         >
            <ChevronLeft className="size-5" />
         </button>
         <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
         >
            <ChevronRight className="size-5" />
         </button>
      </div>
   );
}
