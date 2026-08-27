import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/queries/article.queries";
import { CURRENT_SITE } from "@/lib/site";
import { ArticleDetail } from "@main/components/article-detail";
import { CategoryBreadcrumb } from "@/components/navigation/category-breadcrumbs";
import { getCategoryPathChain } from "@/lib/queries/categorie.queries";

export default async function ArticlePage({
   params,
}: {
   params: Promise<{ slug: string[] }>;
}) {
   const { slug } = await params;
   /* console.log("slug reçu :", slug); */

   if (!slug || slug.length === 0) {
      notFound();
   }

   const articleSlug = slug[slug.length - 1];
   const categoryPath = slug.slice(0, -1);

   const [article, breadcrumb] = await Promise.all([
      getArticleBySlug(articleSlug),
      getCategoryPathChain(CURRENT_SITE, categoryPath),
   ]);

   if (!article) {
      console.log("→ 404 car article introuvable");
      notFound();
   }

   if (!breadcrumb) {
      console.log("→ 404 car breadcrumb introuvable");
      notFound();
   }

   return (
      <>
         <CategoryBreadcrumb chain={breadcrumb} />
         <ArticleDetail article={article} />
      </>
   );
}
