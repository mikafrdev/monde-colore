"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Star } from "lucide-react";
import { routes } from "@main/lib/routes";
import type { ArticleWithRelations } from "@/lib/queries/article.queries";

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

export function ArticleSection({ title, articles }: ArticleSectionProps) {
   /* console.log("Articles in section:", articles); */

   const sevenDaysAgo = new Date();
   sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

   return (
      <>
         <h2 className="text-2xl font-bold">{title}</h2>
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-4">
            {articles.map((article, index) => {
               const isAboveFold = index < 4;

               const primaryImage =
                  article.images.find((i) => i.isPrimary) ?? article.images[0];
               const primaryVideo =
                  article.videos?.find((v) => v.isPrimary) ??
                  article.videos?.[0];

               const videoThumb =
                  primaryVideo?.video?.thumbnailUrl ??
                  getYoutubeThumbnail(primaryVideo?.video?.embedUrl ?? null);

               const imageUrl = videoThumb ?? primaryImage?.image?.url ?? null;

               const imageAlt = primaryImage?.image?.alt ?? article.title;

               const articleDate = article.publishedAt ?? article.createdAt;

               const isNew = new Date(articleDate) > sevenDaysAgo;

               return (
                  <Link
                     key={article.id}
                     href={routes.article(
                        article.categories[0]?.slug ?? "autres",
                        article.slug,
                     )}
                     /* href="#" */
                     className="block"
                  >
                     {article.categories.map((category) => (
                        <div key={category.id}>{category.name}</div>
                     ))}
                     <Card className="group relative overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        {/* Badge */}
                        <div className="absolute top-3 right-3 z-10">
                           {isNew && (
                              <Badge className="border-primary/20 bg-primary/10 text-primary backdrop-blur-sm">
                                 Nouveau
                              </Badge>
                           )}
                        </div>

                        {/* Image */}
                        <div className="relative aspect-video overflow-hidden border-b border-border">
                           {imageUrl ? (
                              <Image
                                 loading={isAboveFold ? "eager" : "lazy"}
                                 priority={isAboveFold}
                                 src={imageUrl}
                                 alt={imageAlt}
                                 fill
                                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                 className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                           ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                 <ImageIcon className="size-8 text-muted-foreground" />
                              </div>
                           )}
                        </div>

                        {/* Content */}
                        <CardHeader className="mt-2 space-y-3">
                           <CardTitle className="line-clamp-2 text-lg leading-tight">
                              {article.title}
                           </CardTitle>

                           <CardDescription className="line-clamp-3 text-sm">
                              {article.excerpt ?? ""}
                           </CardDescription>
                        </CardHeader>

                        {/* Footer */}
                        <CardFooter className="flex items-center gap-3 border-0 pb-5">
                           <Button
                              variant="default"
                              className="flex-1 font-semibold"
                              onClick={(e) => {
                                 e.preventDefault();
                                 e.stopPropagation();

                                 // logique favoris
                              }}
                           >
                              Voir
                           </Button>

                           <Button
                              variant="outline"
                              size="icon"
                              aria-label="Ajouter aux favoris"
                              className="shrink-0"
                           >
                              <Star
                                 className="size-5"
                                 strokeWidth={2}
                                 color="#b6a33c"
                              />
                           </Button>
                        </CardFooter>
                     </Card>
                  </Link>
               );
            })}
         </div>
      </>
   );
}
