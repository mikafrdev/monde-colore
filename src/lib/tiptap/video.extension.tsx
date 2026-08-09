// src/lib/tiptap/video.extension.tsx
"use client";
import Image from "next/image";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { useState } from "react";

export interface VideoOptions {
   HTMLAttributes: Record<string, string>;
}

declare module "@tiptap/core" {
   interface Commands<ReturnType> {
      video: {
         setVideo: (options: {
            src: string;
            title?: string;
            provider?: string;
            poster?: string;
         }) => ReturnType;
      };
   }
}

function VideoNodeView({ node }: NodeViewProps) {
   const src = node.attrs.src as string | null;
   const title = node.attrs.title as string | null;
   const poster = node.attrs.poster as string | null;
   const [playing, setPlaying] = useState(false);

   if (!src) return null;

   const youtubeThumbnail = (() => {
      const match = src.match(
         /(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      );
      return match
         ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
         : null;
   })();

   const thumbnail = youtubeThumbnail ?? poster;

   return (
      <NodeViewWrapper>
         <div
            className="relative w-full mx-auto rounded overflow-hidden bg-black"
            style={{ aspectRatio: "16/9", maxWidth: "80%" }}
         >
            {playing ? (
               <iframe
                  src={`${src}${src.includes("?") ? "&" : "?"}autoplay=1`}
                  title={title ?? "video"}
                  allowFullScreen
                  allow="autoplay; fullscreen"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: "none" }}
               />
            ) : (
               <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                  onClick={() => setPlaying(true)}
               >
                  {thumbnail && (
                     <Image
                        src={thumbnail}
                        alt={title ?? "video"}
                        width={800}
                        height={400}
                        className="absolute inset-0 w-full h-full object-cover"
                     />
                  )}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-black/70 group-hover:bg-black/90 transition">
                     <svg
                        className="w-7 h-7 text-white ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                     >
                        <path d="M8 5v14l11-7z" />
                     </svg>
                  </div>
               </div>
            )}
         </div>
      </NodeViewWrapper>
   );
}

export const Video = Node.create<VideoOptions>({
   name: "video",
   group: "block",
   atom: true,

   addOptions() {
      return { HTMLAttributes: {} };
   },

   addAttributes() {
      return {
         src: { default: null },
         title: { default: null },
         provider: { default: null },
         poster: { default: null },
      };
   },

   parseHTML() {
      return [{ tag: "div[data-video]" }];
   },

   renderHTML({ HTMLAttributes }) {
      const { src, title } = HTMLAttributes;
      return [
         "div",
         mergeAttributes({ "data-video": "" }, this.options.HTMLAttributes),
         [
            "iframe",
            {
               src: src ?? "",
               title: title ?? "video",
               allowfullscreen: "true",
               frameborder: "0",
               style: "width:100%;aspect-ratio:16/9;",
            },
         ],
      ];
   },

   addNodeView() {
      return ReactNodeViewRenderer(VideoNodeView);
   },

   addCommands() {
      return {
         setVideo:
            (options) =>
            ({ commands }) => {
               return commands.insertContent({
                  type: this.name,
                  attrs: options,
               });
            },
      };
   },
});
