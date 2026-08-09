// src/lib/tiptap/video.extension.server.ts  (pas de "use client", pas de useState)
import { Node, mergeAttributes } from "@tiptap/core";

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

export const VideoServer = Node.create<VideoOptions>({
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
