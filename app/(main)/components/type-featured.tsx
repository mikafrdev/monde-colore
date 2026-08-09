import { Site } from "@/lib/prisma/generated/enums";
import { ArticleSection } from "@main/components/article-section";
import { getArticlesBySiteAndCategoryAction } from "@/lib/queries/article.queries";
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

   return (
      <ArticleSection
         title={categorySlug ?? "Tous les articles"}
         articles={articles}
      />
   );
}
