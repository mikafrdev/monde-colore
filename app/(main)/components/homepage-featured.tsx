import { Site } from "@/lib/prisma/generated/browser";
import { getHomepageFeaturedAction } from "@/lib/queries/article.queries";
import { useDataQuery } from "@/hooks/use-data-query";
import { ArticleSection } from "@main/components/article-section";

export function HomepageFeatured({ site }: { site: Site }) {
   const { data, isLoading } = useDataQuery(["homepage-featured", site], () =>
      getHomepageFeaturedAction(site),
   );

   if (isLoading || !data) {
      return null;
   }

   return (
      <div className="space-y-10">
         <ArticleSection title="Informations" articles={data.informations} />

         <ArticleSection title="Cuisine" articles={data.cuisines} />

         <ArticleSection title="Jeux Vidéo" articles={data.jeux-videos} />
      </div>
   );
}
