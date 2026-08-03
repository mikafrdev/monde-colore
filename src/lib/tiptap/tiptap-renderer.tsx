import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { Document } from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { Heading } from "@tiptap/extension-heading";
import { BulletList, OrderedList, ListItem } from "@tiptap/extension-list";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Image as TiptapImage } from "@tiptap/extension-image";
import NextImage from "next/image";
import { VideoServer } from "@/lib/tiptap/video.extension.server";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Link } from "@tiptap/extension-link";

interface TiptapRendererProps {
   content: string;
}

export function TiptapRenderer({ content }: TiptapRendererProps) {
   if (!content) return null;

   try {
      // Compteur pour tracker la première image
      let imageCount = 0;
      const json = JSON.parse(content);

      return renderToReactElement({
         extensions: [
            Document,
            Paragraph,
            Text,
            Heading,
            BulletList,
            OrderedList,
            ListItem,
            Bold,
            Italic,
            HorizontalRule,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Highlight.configure({ multicolor: true }),
            Subscript,
            Superscript,
            TiptapImage,
            VideoServer,
            HardBreak,
            Link
         ],
         content: json,
         options: {
            nodeMapping: {
               hardBreak: () => <br />,
               image: ({ node }) => {
                  const isFirst = imageCount === 0;
                  imageCount++;
                  const w = node.attrs.width ?? 800;
                  const h = node.attrs.height ?? 600;
                  return (
                     <NextImage
                        key={node.attrs.src}
                        src={node.attrs.src}
                        alt={node.attrs.alt ?? ""}
                        width={w}
                        height={h}
                        className="rounded-md"
                        sizes={`(max-width: 768px) 100vw, ${Math.min(w, 800)}px`}
                        loading={isFirst ? "eager" : "lazy"}
                        priority={isFirst}
                     />
                  );
               },
               video: ({ node }) => {
                  const { src, title, provider } = node.attrs;
                  if (provider === "YOUTUBE" || provider === "VIMEO") {
                     return (
                        <div
                           key={src}
                           className="relative w-full aspect-video rounded-md overflow-hidden my-4"
                        >
                           <iframe
                              src={src}
                              title={title ?? ""}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                           />
                        </div>
                     );
                  }
                  return (
                     <video
                        key={src}
                        src={src}
                        title={title ?? ""}
                        controls
                        className="w-full rounded-md my-4"
                     />
                  );
               },
            },
         },
      });
   } catch (e) {
      console.error("TiptapRenderer parse error:", e);
      return <p>{content}</p>;
   }
}
