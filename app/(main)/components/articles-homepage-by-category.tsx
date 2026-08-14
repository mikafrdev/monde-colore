"use client";

import Link from "next/link";
import Image from "next/image";
import { ArticleWithRelations } from "@/lib/queries/article.types";
import { routes } from "@/lib/routes";

type ArticleSectionProps = {
   title: string;
   articles: ArticleWithRelations[];
};

function getYoutubeThumbnail(embedUrl: string | null): string | null {
   if (!embedUrl) return null;
   const match = embedUrl.match(
      /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
   );
   return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
}

export function ArticleHomePageByCategory({
   title,
   articles,
}: ArticleSectionProps) {
   const sevenDaysAgo = new Date();
   sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

   const headingId = `article-list-${title.toLowerCase().replace(/\s+/g, "-")}`;

   return (
      <section aria-labelledby={headingId}>
         <h2 id={headingId} className="text-2xl font-bold my-4">
            {title}
         </h2>

         <div className="flex flex-wrap justify-center gap-6">
            {articles.map((article, index) => {
               const primaryImage =
                  article.images.find((i) => i.isPrimary) ?? article.images[0];
               const primaryVideo =
                  article.videos?.find((v) => v.isPrimary) ??
                  article.videos?.[0];

               const videoThumb =
                  primaryVideo?.video?.thumbnailUrl ??
                  getYoutubeThumbnail(primaryVideo?.video?.embedUrl ?? null);

               const imageUrl =
                  videoThumb ||
                  primaryImage?.image?.url ||
                  "/images/placeholder.wepb";
               const imageAlt = primaryImage?.image?.alt ?? article.title;

               const articleDate = article.publishedAt ?? article.createdAt;
               const isNew = new Date(articleDate) > sevenDaysAgo;

               const imgWidth = primaryImage?.image?.width ?? 0;
               const imgHeight = primaryImage?.image?.height ?? 0;
               const isLandscape = imgWidth > imgHeight;
               console.log("imageUrl:", imageUrl);
               console.log("imageAlt:", imageAlt);

               return (
                  <Link
                     key={article.id}
                     href={routes.article(
                        article.categories[0]?.slug ?? "autres",
                        article.slug,
                     )}
                     className={`${isLandscape ? "max-w-[400px]" : "max-w-[30%]"}
                     flex flex-col justify-center align-middle min-w-[250px] `}
                  >
                     <div className="">
                        <div className="relative flex justify-center">
                           <Image
                              loading={index === 0 ? "eager" : "lazy"}
                              priority={index === 0}
                              src={imageUrl}
                              alt={imageAlt}
                              width={imgWidth || 800}
                              height={imgHeight || 600}
                              className={` object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-[filter] duration-300 group-hover:drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)]`}
                           />
                        </div>

                        <div className="flex flex-col items-center text-center border-0 pt-3 pb-5">
                           <span className="font-semibold">
                              {article.title}
                           </span>
                           {article.excerpt && (
                              <span className="text-sm text-gray-600">
                                 {article.excerpt}
                              </span>
                           )}
                        </div>
                     </div>
                  </Link>
               );
            })}
         </div>
      </section>
   );
}
