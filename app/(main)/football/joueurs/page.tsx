import { Site } from "@/lib/prisma/generated/enums";
import { getArticlesByCategorySlugAction } from "@/lib/queries/article.queries";
import { ArticleHomePageByCategory } from "@main/components/articles-homepage-by-category";
import { notFound } from "next/navigation";

export default async function PageFootballJoueurs() {
   const result = await getArticlesByCategorySlugAction(
      Site.LEO,
      "joueurs",
   );

   if (!result) {
      notFound();
   }

   const { category, articles } = result;

   return (
      <div className="flex flex-col gap-6 pl-4 flex-1 px-4">
         <h1 className="hidden">Football Joueurs </h1>
         <ArticleHomePageByCategory title={category.name} articles={articles} />
      </div>
   );
}
