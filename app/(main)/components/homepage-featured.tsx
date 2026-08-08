import { useDataQuery } from "@main/hooks/use-data-query";
import { ArticleSection } from "@main/components/article-section";
import { getHomepageArticlesAction } from "@/lib/queries/article.queries";

type HomepageData = Awaited<ReturnType<typeof getHomepageArticlesAction>>;

export function HomepageFeatured() {
  const { data } = useDataQuery<HomepageData>(
    ["articles", "homepage"],
    getHomepageArticlesAction,
  );
  if (!data) return null;
  return (
    <div className="space-y-10">
      <ArticleSection title="Informations" articles={data.informations} />
      <ArticleSection title="Cuisine" articles={data.cuisines} />
      <ArticleSection title="Jeux Vidéo" articles={data.jeuxvideos} />
    </div>
  );
}