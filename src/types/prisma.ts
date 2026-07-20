export type FeaturesList = Feature[];
import type { Prisma } from "@/lib/prisma/generated/client";

export type Feature = {
  imageSrc: string;  // Source de l'image
  imageAlt: string;  // Texte alternatif pour l'image
  title: string;     // Titre de l'article ou de la carte
  description: string; // Description détaillée
  link: string;      // Lien vers la page ou l'action
};

export type Team = {
   id: number;
   name: string;
   shortName: string;
   tla: string;
   crest: string;
}

export type Match = {
   id: number;
   utcDate: string;
   status: string;
   homeTeam: Team;
   awayTeam: Team;
   competition: {
      name: string;
      emblem: string;
   };
}

export type FootballResponse = {
   matches: Match[];
}