"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function signOutAction() {
   const response = await auth.api.signOut({
      headers: await headers(),
   });

   console.log("Response from signOut API:", response);

   if (!response) {
      console.error("❌ Échec :", response ?? "Erreur de déconnexion");
      return { error: response ?? "Erreur de déconnexion" };
   }

   console.log("✅ Déconnexion réussie");
   revalidatePath("/", "layout");
   return { success: true };
}
