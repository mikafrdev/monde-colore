import { CategoryPathSegment } from "@/lib/queries/category.types";
import Link from "next/link";

export function CategoryBreadcrumb({
   chain,
}: {
   chain: CategoryPathSegment[];
}) {
   return (
      <nav aria-label="Fil d'ariane">
         {chain.map((cat, i) => (
            <span key={cat.id}>
               <Link
                  href={`/articles/${chain
                     .slice(0, i + 1)
                     .map((c) => c.slug)
                     .join("/")}`}
               >
                  {cat.name}
               </Link>
               {i < chain.length - 1 && " > "}
            </span>
         ))}
      </nav>
   );
}
