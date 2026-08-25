import { CategoryPathSegment } from "@/lib/queries/category.types";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

export function CategoryBreadcrumb({
   chain,
}: {
   chain: CategoryPathSegment[];
}) {
   return (
      <nav
         aria-label="Fil d'ariane"
         className="flex items-center flex-wrap p-4 text-sm"
      >
         {chain.map((cat, i) => {
            const isLast = i === chain.length - 1;
            const href = `/articles/${chain
               .slice(0, i + 1)
               .map((c) => c.slug)
               .join("/")}`;

            return (
               <div key={cat.id} className="">
                  {isLast ? (
                     <span className="font-semibold text-foreground">
                        {cat.name}
                     </span>
                  ) : (
                     <Link
                        href={href}
                        className="text-muted-foreground hover:text-foreground transition-colors relative
                       after:content-[''] after:absolute after:left-0 after:bottom-0
                       after:w-full after:h-[1.5px] after:bg-primary after:origin-left
                       after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                     >
                        {cat.name}
                     </Link>
                  )}
                  {!isLast && <span className="px-2 text-border">/</span>}
               </div>
            );
         })}
      </nav>
   );
}
