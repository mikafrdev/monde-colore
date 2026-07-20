import { ArticleType } from "@/lib/prisma/generated/enums";
import { useTableQuery } from "@main/hooks/use-table-query";
import { getArticlesAction } from "@main/actions/get-articles-action";
import { ArticleSection } from "@main/components/article-section";
import { useDataQuery } from "@main/hooks/use-data-query";

export function TypedFeatured({ pageType }: { pageType?: ArticleType }) {
    
   const { data: articles = [] } = useDataQuery(
      ["articles", { type: pageType }],
      () => getArticlesAction({ type: pageType }),
   );

   return <ArticleSection title={pageType ?? "Articles"} articles={articles} />;
}
