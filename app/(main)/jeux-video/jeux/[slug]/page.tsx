// page.tsx
import { getArticleBySlug } from "@/lib/queries/article.queries";
import { notFound } from "next/navigation";
import { ArticlePageContent } from "@main/components/article-page-content";

interface ArticlePageProps {
   params: Promise<{ type: string; slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
   const { type, slug } = await params;

   // Éviter de capturer les routes API
   if (type === "api") notFound();

   const article = await getArticleBySlug(slug);
   if (!article) notFound();

   return <ArticlePageContent article={article} carouselHeight={288} />;
}
