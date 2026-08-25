"use client";

import Link from "next/link";
import Image from "next/image";
import { ArticleCardType } from "@/lib/queries/article.types";
import { routes } from "@/lib/routes";
import { Article } from "@/lib/prisma/generated/client";
import { ArticleCard } from "./article-card";

type ArticleSectionProps = {
   title: string;
   articles: ArticleCardType[];
};

function getYoutubeThumbnail(embedUrl: string | null): string | null {
   if (!embedUrl) return null;
   const match = embedUrl.match(
      /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
   );
   return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
}

export function ListArticleHomePageByCategory({
   title,
   articles,
}: ArticleSectionProps) {
   const sevenDaysAgo = new Date();
   sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

   const headingId = `article-list-${title.toLowerCase().replace(/\s+/g, "-")}`;

   return (
      <section aria-labelledby={headingId}>
         <h2 id={headingId} className="text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)]
         font-bold
         leading-[1.2]
         tracking-[-0.02em]
         pl-3.5
         border-l-[3px]
         border-l-primary
         ml-3
         mt-8
         mb-4
         text-foreground">{title}</h2>

         <div className="flex flex-wrap justify-center gap-6">
            {articles.map((article, index) => {
               return (
                  <ArticleCard
                     key={article.id}
                     article={article}
                     priority={index < 4}
                     href={routes.article(
                        article.categories[0]?.slug ?? "autres",
                        article.slug,
                     )}
                  />
               );
            })}
         </div>
      </section>
   );
}
