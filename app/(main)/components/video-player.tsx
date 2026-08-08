"use client";
import Image from "next/image";

import { useState } from "react";

interface VideoPlayerProps {
   embedUrl?: string | null;
   fileUrl?: string | null;
   thumbnailUrl?: string | null;
   altText?: string | null;
   title: string;
}

export function VideoPlayer({
   embedUrl,
   fileUrl,
   thumbnailUrl,
   altText,
   title,
}: VideoPlayerProps) {
   const [playing, setPlaying] = useState(false);

   console.log("DEBUG :", embedUrl, fileUrl, thumbnailUrl);

   if (embedUrl) {
      return playing ? (
         <iframe
            src={embedUrl}
            title={title}
            className="w-full rounded-xl aspect-video border-0"
            allowFullScreen
            loading="lazy"
         />
      ) : (
         <button
            onClick={() => setPlaying(true)}
            className="relative w-full aspect-video rounded-xl overflow-hidden bg-black"
         >
            {thumbnailUrl && (
               <Image
                  width={640}
                  height={360}
                  src={thumbnailUrl}
                  alt={altText ?? title}
                  className="w-full h-full object-cover"
               />
            )}
            <span className="absolute inset-0 flex items-center justify-center">
               <span className="bg-black/60 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl">
                  ▶
               </span>
            </span>
         </button>
      );
   }

   if (fileUrl) {
      return (
         <video
            src={fileUrl}
            poster={thumbnailUrl ?? undefined}
            controls
            className="w-full rounded-xl aspect-video bg-black"
         />
      );
   }

   return null;
}
