import {
   getArticleHomepageGroupedByCategoryAction,
   getArticlesByCategoryPathAction,
} from "@/lib/queries/article.queries";
import { CURRENT_SITE } from "@/lib/site";
import { notFound } from "next/navigation";
import { ListArticleSlugByDate } from "@main/components/list-articles-slug-by-date";
import { CategoryBreadcrumb } from "@/components/navigation/category-breadcrumbs";
import { ListArticleHomePageByCategory } from "@main/components/list-articles-homepage-by-category";

export default async function ArticlesListPage({
   params,
}: {
   params: Promise<{ slug?: string[] }>;
}) {
   const { slug: segments } = await params;

   if (!segments || segments.length === 0) {
      const groups =
         await getArticleHomepageGroupedByCategoryAction(CURRENT_SITE);
      return (
         <>
            {groups.map((group) => (
               <ListArticleHomePageByCategory
                  key={group.category.id}
                  title={group.category.name}
                  articles={group.articles}
               />
            ))}
         </>
      );
   }

   const result = await getArticlesByCategoryPathAction(CURRENT_SITE, segments);

   if (!result) notFound();

   console.log("result.category.image : ", result.category.image)

   return (
      <>
         <CategoryBreadcrumb chain={result.breadcrumb} />

         <ListArticleSlugByDate
            title={result.category.name}
            image={result.category.image}
            articles={result.articles}
         />
      </>
   );
}
