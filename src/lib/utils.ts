import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

import type { Prisma } from "@/lib/prisma/generated/client";

// Tronque à n mots
export const truncateWords = (text: string, max: number): string => {
   const words = text.split(" ").filter(Boolean);
   return words.length > max ? words.slice(0, max).join(" ") + "…" : text;
};

export const truncateChars = (text: string, maxLength: number): string => {
   if (text.length <= maxLength) return text;
   return text.slice(0, maxLength) + "…";
};
