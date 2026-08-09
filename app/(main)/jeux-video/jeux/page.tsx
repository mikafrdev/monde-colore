/* Home Page Jeux Video */
/* import { AppSearch } from "@/components/app-search"; */
import Footer from "@/components/footer";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { Site } from "@/lib/prisma/generated/enums";
import { getCategoryBySlug } from "@/lib/queries/categorie.queries";
import { AppFeatured } from "@main/components/app-featured";
import { notFound } from "next/dist/client/components/navigation";

export default async function PageJeuxVideo() {
   /* await new Promise((r) => setTimeout(r, 2000)); */

   const category = await getCategoryBySlug("jeux-video");

   if (!category) {
      notFound();
   }

   return (
      <div className="flex flex-col gap-6 pl-4 flex-1 px-4">
         <h1 className="hidden">Jeux Vidéo </h1>
         {/* <AppSearch /> */}
         <AppFeatured site={Site.LEO} categorySlug={category?.slug} />
         <Footer />
         <ScrollToTopButton />
      </div>
   );
}
