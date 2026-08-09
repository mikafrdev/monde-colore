"use client";
import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { ArticleWithRelations } from "@/lib/queries/article.queries";
import { routes } from "@/lib/routes";
type ArticleSectionProps = { title: string; articles: ArticleWithRelations[] };
function getYoutubeThumbnail(embedUrl: string | null): string | null {
   if (!embedUrl) return null;
   const match = embedUrl.match(
      /(?:youtube.com\/(?:embed\/|watch\?v=)|youtu.be\/)([a-zA-Z0-9_-]{11})/,
   );
   return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
}
export function ArticleSection({ articles }: ArticleSectionProps) {
   return (
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
         {" "}
         {articles.map((article) => {
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
               <div key={article.id} className="mb-6 break-inside-avoid">
                  {" "}
                  <Link
                     href={routes.article(
                        article.categories[0]?.slug ?? "autres",
                        article.slug,
                     )}
                     className="group block"
                  >
                     {" "}
                     <h3 className="mb-3 text-center font-medium">
                        {" "}
                        {article.title}{" "}
                     </h3>{" "}
                     <div
                        className="relative mx-auto w-[80%] rounded-lg p-[5px] transition-transform duration-300 hover:scale-105"
                        style={{
                           background: `conic-gradient( from var(--border-angle), #ff0000, #ff8800, #ffee00, #00ff00, #00ffee, #0088ff, #8800ff, #ff00aa, #ff0000 )`,
                           animation: "border-spin 4s linear infinite",
                        }}
                     >
                        {" "}
                        <div className="rounded-lg bg-background p-[4px]">
                           {" "}
                           {imageUrl ? (
                              <Image
                                 width={300}
                                 height={100}
                                 className="w-full h-auto rounded-lg block"
                                 priority
                                 src={imageUrl}
                                 alt={imageAlt}
                              />
                           ) : (
                              <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-muted">
                                 {" "}
                                 <ImageIcon className="size-8 text-muted-foreground" />{" "}
                              </div>
                           )}{" "}
                        </div>{" "}
                     </div>{" "}
                  </Link>{" "}
               </div>
            );
         })}{" "}
      </div>
   );
}
