// components/article-list.tsx
"use client";
import type { ArticleWithRelations } from "@/lib/queries/article.types";
import { routes } from "@/lib/routes";
import { Gallery } from "./gallery";
import { ArticleCard } from "./article-card";

type ArticleListProps = {
   title?: string;
   articles: ArticleWithRelations[];
   heroImages?: { src: string }[];
   columnsClassName?: string;
};

export function ArticleList({
   title,
   articles,
   heroImages,
   columnsClassName = "columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4",
}: ArticleListProps) {
   return (
      <>
         {heroImages && heroImages.length > 0 && (
            <div className="relative w-full min-h-96 overflow-hidden shadow-md">
               <Gallery images={heroImages} />
            </div>
         )}

         {title && <h2 className="hidden mb-6 text-2xl font-semibold">{title}</h2>}

         <div className={columnsClassName}>
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