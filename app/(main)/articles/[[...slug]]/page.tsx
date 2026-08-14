import { Site } from "@/lib/prisma/generated/enums";
import { getArticleHomepageGroupedByCategoryAction } from "@/lib/queries/article.queries";
import { ArticleHomePageByCategory } from "@main/components/articles-homepage-by-category";

export default async function ArticlesListPage({
   params,
}: {
   params: Promise<{ slug?: string[] }>;
}) {
   const { slug: segments } = await params;

   if (!segments || segments.length === 0) {
      const categorySlugList = ["informations", "cuisine", "jeux-video"];
      const articlesByCategory =
         await getArticleHomepageGroupedByCategoryAction(
            Site.MIKA,
            categorySlugList,
         );

      const groups = articlesByCategory.filter((group) => group !== null);

      return (
         <>
            {groups.map((group) => (
               <ArticleHomePageByCategory
                  key={group.category.id}
                  title={group.category.name}
                  articles={group.articles}
               />
            ))}
         </>
      );
   }
}
