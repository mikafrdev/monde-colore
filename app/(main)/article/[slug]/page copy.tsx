import { getArticleBySlug } from "@/lib/queries/article.queries";
import { notFound } from "next/navigation";
import { Carousel } from "@main/components/carousel";
import { TiptapRenderer } from "@/lib/tiptap/tiptap-renderer";
import { VideoPlayer } from "@main/components/video-player";
import NextImage from "next/image";

interface ArticlePageProps {
   params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
   const { slug } = await params;
   const article = await getArticleBySlug(slug);

   if (!article) notFound();

   const primaryImage =
      article.images.find((i) => i.isPrimary) ?? article.images[0];

   const sortedImages = [
      ...article.images.filter((i) => i.isPrimary),
      ...article.images.filter((i) => !i.isPrimary),
   ];

   const primaryVideo =
      article.videos?.find((v) => v.isPrimary) ?? article.videos?.[0];
   const sortedVideos = [
      ...(article.videos?.filter((v) => v.isPrimary) ?? []),
      ...(article.videos?.filter((v) => !v.isPrimary) ?? []),
   ];

   return (
      <article className="max-w-3xl mx-auto px-4 py-8">
         {primaryImage && (
            <div className="relative w-full h-72 mb-8 rounded-xl overflow-hidden">
               <Carousel
                  images={sortedImages.map((i) => ({
                     url: i.image.url,
                     alt: i.image.alt,
                     label: i.isPrimary ? "Image principale" : null,
                  }))}
                  height={288}
                  fit="contain"
                  showLabel
                  priority
                  className="mb-8"
               />
            </div>
         )}

         <header className="mb-6">
            <div className="flex gap-2 mb-3">
               {article.categories.map((cat) => (
                  <span
                     key={cat.id}
                     className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded"
                  >
                     {cat.name}
                  </span>
               ))}
            </div>
            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
            {article.excerpt && (
               <p className="text-muted-foreground text-lg">
                  {article.excerpt}
               </p>
            )}
            <div className="flex gap-4 text-sm text-muted-foreground mt-3">
               <span>{article.author.name}</span>
               {article.publishedAt && (
                  <span>
                     {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                  </span>
               )}
               {article.source && <span>{article.source.name}</span>}
            </div>
         </header>

         <div className="prose prose-neutral dark:prose-invert max-w-none">
            <TiptapRenderer content={article.body} />
         </div>

         {sortedVideos.length > 0 && (
            <div className="mt-8 flex flex-col gap-6">
               {sortedVideos.map(({ video, caption }, i) => (
                  <figure key={i}>
                     <VideoPlayer
                        embedUrl={video.embedUrl}
                        fileUrl={video.fileUrl}
                        thumbnailUrl={video.thumbnailUrl}
                        altText={video.altText}
                        title={video.title}
                     />
                     {caption && (
                        <figcaption className="text-sm text-muted-foreground mt-2 text-center">
                           {caption}
                        </figcaption>
                     )}
                  </figure>
               ))}
            </div>
         )}
      </article>
   );
}
