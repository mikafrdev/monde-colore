import {
   Card,
   CardAction,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function HomeNavigationCard({
   icon,
   title,
   description,
   href,
   isLast,
}: {
   icon: React.ReactNode;
   title: string;
   description: string;
   href: string;
   isLast?: boolean;
}) {
   return (
      <Link
         href={href}
         className="group/card block size-full"
         aria-label={title}
      >
         {!isLast ? (
            <Card className="relative size-full hover:bg-secondary hover:border-primary transition-colors duration-700 border-foreground">
               <CardHeader className="h-full">
                  <CardAction>
                     <div className="p-4 group-hover/card:bg-white rounded-2xl transition-colors">
                        {icon}
                     </div>
                  </CardAction>
                  <CardTitle className="min-h-10">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
               </CardHeader>
            </Card>
         ) : (
            <Card className="size-full hover:bg-secondary hover:border-primary transition-colors duration-700 bg-[#f9f9f9] border-[#c9c9cb] border-dashed">
               <CardHeader>
                  <CardTitle className="min-h-10 flex items-center justify-center">
                     {icon}
                  </CardTitle>
                  <CardDescription>{description}</CardDescription>
               </CardHeader>
            </Card>
         )}
      </Link>
   );
}
