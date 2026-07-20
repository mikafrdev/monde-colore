import { useDataQuery } from "@main/hooks/use-data-query";
import { getHomepageArticlesAction } from "@main/actions/get-articles-action";
import { ArticleSection } from "@main/components/article-section";

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