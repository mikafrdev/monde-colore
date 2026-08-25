import { Site } from "@/lib/prisma/generated/browser";
import { getHomepageFeaturedAction } from "@/lib/queries/article.queries";
import { useDataQuery } from "@/hooks/use-data-query";
/* import { ArticleList } from "@main/components/list-articles-slug-by-date";
 */
export function HomepageFeatured({ site }: { site: Site }) {
   const { data, isLoading } = useDataQuery(["homepage-featured", site], () =>
      getHomepageFeaturedAction(site),
   );

   if (isLoading || !data) {
      return null;
   }

   return (
      <div className="space-y-10">test
         {/* <ArticleList title="Informations" articles={data.informations} />

         <ArticleList title="Cuisine" articles={data.cuisines} />

         <ArticleList title="Jeux Vidéo" articles={data.jeux-videos} />*/}
      </div> 
   );
}
