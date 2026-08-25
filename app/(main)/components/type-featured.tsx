import { Site } from "@/lib/prisma/generated/enums";
/* import { ArticleList } from "@main/components/list-articles-slug-by-date";
 */import { getArticlesBySiteAndCategoryAction } from "@/lib/queries/article.queries";
import { useDataQuery } from "@/hooks/use-data-query";

type TypedFeaturedProps = {
   site: Site;
   categorySlug?: string;
};

export function TypedFeatured({ site, categorySlug }: TypedFeaturedProps) {
   const { data: articles = [] } = useDataQuery(
      ["articles", { site, categorySlug }],
      () => getArticlesBySiteAndCategoryAction(site, categorySlug),
   );

   /* return (
      <ArticleList
         title={categorySlug ?? "Tous les articles"}
         articles={articles}
         heroImages={[
            { src: "/uploads/images/a77417c2-52ff-49bc-b749-8e4c18fc9d41.jpg" },
         ]}
      />
   ); */
}
