import Image from "next/image";
import { gameListType } from "@/types/game";

type JeuxVideoListProps = {
   gameList: gameListType[];
};

export default async function JeuxVideoList({ gameList }: JeuxVideoListProps) {
   /* await new Promise((r) => setTimeout(r, 4000)); */
   return (
      <>
         {gameList.map((game) => (
            <div key={game.url}>
               <h3 className="p-4">{game.title}</h3>
               <div className="flex justify-center">
                     <Image
                        width={300}
                        height={100}
                        className="w-[80%] h-auto"
                        /* className="object-cover object-[50%_50%]" */
                        priority
                        src={`/uploads/images/${game.url}`}
                        alt="Les jeux"
                        /* sizes="(max-width: 250px) 100vw, 350px" */
                     />
               </div>
            </div>
         ))}
      </>
   );
}
