import {
   getArticleHomepageGroupedByCategoryAction,
   getArticlesByCategoryPathAction,
} from "@/lib/queries/article.queries";
import { CURRENT_SITE } from "@/lib/site";
import { notFound } from "next/navigation";
import { ListArticleSlugByDate } from "@main/components/list-articles-slug-by-date";
import { CategoryBreadcrumb } from "@/components/navigation/category-breadcrumbs";
import { ListArticleHomePageByCategory } from "@main/components/list-articles-homepage-by-category";
import { prisma } from "@/lib/prisma";

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

   return (
      <>
         <CategoryBreadcrumb chain={result.breadcrumb} />

         <ListArticleSlugByDate
            title={result.category.name}
            articles={result.articles}
         />
      </>
   );
}
