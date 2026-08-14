import Image from "next/image";
import { gameListType } from "@/types/game";
import Link from "next/dist/client/link";

type dataListProps = {
   dataList: gameListType[];
};

export default async function SubCategoryList({ dataList }: dataListProps) {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   return (
      <>
         {dataList.map((data) => (
            <div key={data.url}>
               <Link href={data.link} className="block group">
                  <h3 className="py-8 text-center font-medium">{data.title}</h3>
                  <div
                     className="relative w-[80%] mx-auto rounded-lg p-[5px] transition-transform duration-300 hover:scale-105"
                     style={{
                        background: `conic-gradient(from var(--border-angle), 
               #ff0000, #ff8800, #ffee00, #00ff00, 
               #00ffee, #0088ff, #8800ff, #ff00aa, #ff0000)`,
                        animation: "border-spin 4s linear infinite",
                     }}
                  >
                     <div className="rounded-lg bg-background p-[4px]">
                        <Image
                           width={300}
                           height={100}
                           className="w-full h-auto rounded-lg block"
                           priority
                           src={`/uploads/images/${data.url}`}
                           alt={data.title}
                        />
                     </div>
                  </div>
               </Link>
            </div>
         ))}
      </>
   );
}
