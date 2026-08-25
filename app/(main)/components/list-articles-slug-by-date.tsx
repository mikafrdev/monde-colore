// components/article-list.tsx
"use client";
import type { ArticleCardType } from "@/lib/queries/article.types";
import { routes } from "@/lib/routes";
import { ArticleCard } from "./article-card";
import { HeroImage } from "./hero-image";

type ArticleListProps = {
   title: string;
   image?: { url: string; alt: string | null } | null;
   articles: ArticleCardType[];
};

export function ListArticleSlugByDate({
   title,
   articles,
   image,
}: ArticleListProps) {
   /* console.log("articles", articles); */

   return (
      <>
         {image && (
            <div className="relative w-full min-h-96 mb-6 overflow-hidden shadow-md">
               <HeroImage heroImageSrc={image.url} />
            </div>
         )}

         {title && (
            <h2 className="hidden mb-6 text-2xl font-semibold">{title}</h2>
         )}

         <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {articles.map((article, index) => (
               <ArticleCard
                  key={article.id}
                  article={article}
                  priority={index < 4}
                  href={routes.article(
                     article.categories[0]?.slug ?? "autres",
                     article.slug,
                  )}
               />
            ))}
         </div>
      </>
   );
}
