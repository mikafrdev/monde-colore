"use client";

import { useEffect, useRef, useState } from "react";
import { getVideosAction } from "./get-videos-action";

export function RandomVideo() {
   const videoRef = useRef<HTMLVideoElement>(null);
   const [src, setSrc] = useState<string | null>(null);

   useEffect(() => {
      getVideosAction().then((videos) => {
         if (!videos.length) return;
         const random = videos[Math.floor(Math.random() * videos.length)];
         setSrc(random);
      });
   }, []);

   if (!src) return null;

   return (
      <video
         ref={videoRef}
         /* src={src} */
         src={src}
         autoPlay
         muted
         loop
         playsInline
         preload="metadata"
         className="absolute inset-0 w-full h-full object-cover -z-10"
      />
   );
}
