import { notFound } from "next/navigation";
import {
   getArticleBySlug,
} from "@/lib/queries/article.queries";
import { ArticleDetail } from "@main/components/article-detail";

export default async function ArticlePage({
   params,
}: {
   params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

   if (!slug) {
      notFound();
   }

   const article = await getArticleBySlug(slug);

   if (!article) {
      notFound();
   }

   return <ArticleDetail article={article} />;
}
