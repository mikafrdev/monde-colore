// components/article-card.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { getYoutubeThumbnail } from "@/lib/utils/video";
import type { ArticleWithRelations } from "@/lib/queries/article.types";

type ArticleCardProps = {
   article: ArticleWithRelations;
   href: string;
   priority?: boolean;
};

export function ArticleCard({
   article,
   href,
   priority = false,
}: ArticleCardProps) {
   const primaryImage =
      article.images.find((i) => i.isPrimary) ?? article.images[0];
   const primaryVideo =
      article.videos?.find((v) => v.isPrimary) ?? article.videos?.[0];
   const videoThumb =
      primaryVideo?.video?.thumbnailUrl ??
      getYoutubeThumbnail(primaryVideo?.video?.embedUrl ?? null);
   const imageUrl = videoThumb ?? primaryImage?.image?.url ?? null;
   const imageAlt = primaryImage?.image?.alt ?? article.title;

   return (
      <div className="mb-6 break-inside-avoid">
         <Link href={href} className="group block">
            <h3 className="mb-3 text-center font-medium">{article.title}</h3>
            <div
               className="relative mx-auto w-[80%] rounded-lg p-[5px] transition-transform duration-300 hover:scale-105"
               style={{
                  background:
                     "conic-gradient(from var(--border-angle), #ff0000, #ff8800, #ffee00, #00ff00, #00ffee, #0088ff, #8800ff, #ff00aa, #ff0000)",
                  animation: "border-spin 4s linear infinite",
               }}
            >
               <div className="rounded-lg bg-background p-[4px]">
                  {imageUrl ? (
                     <Image
                        width={300}
                        height={100}
                        className="w-full h-auto rounded-lg block"
                        priority={priority}
                        src={imageUrl}
                        alt={imageAlt}
                     />
                  ) : (
                     <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-muted">
                        <ImageIcon className="size-8 text-muted-foreground" />
                     </div>
                  )}
               </div>
            </div>
         </Link>
      </div>
   );
}
