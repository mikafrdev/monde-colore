import { Trophy } from "lucide-react";
import Image from "next/image";

export default async function HomeFeature() {
   return (
      <div className="flex flex-col flex-1 gap-6 px-8 py-8 bg-sidebar">
         <div className="flex gap-4 justify-between">
            <div className="flex-1">
               <h1 className="text-4xl font-bold">
                  Le site de <span>Léo</span> !
               </h1>
               <div className="flex items-center justify-center gap-4 mt-8 p-6 bg-white rounded-2xl ">
                  <Trophy className="size-10" />
                  <span className="text-4xl font-bold text-emerald-500">0</span>
                  <span>points</span>
               </div>
            </div>
            <div className="flex justify-center border-4 border-accent rounded-4xl overflow-hidden bg-white">
               <Image
                  width={100}
                  height={40}
                  src="/home/leo.jpg"
                  alt="Logo"
                  className="w-[200px] h-auto m-5 rounded-full"
                  loading="eager"
               />
            </div>
         </div>
      </div>
   );
}
