"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function SignInAction(email: string, password: string) {
   const response = await auth.api.signInEmail({
      headers: await headers(),
      body: { email, password },
      asResponse: true,
   });

   // ← vérifie si le cookie est bien présent dans la réponse
   /* console.log("🍪 Set-Cookie :", response.headers.get("set-cookie")); */

   if (response.ok) {
      console.log("✅ Déconnexion réussie");

      revalidatePath("/");
      return { success: true };
   } else {
      console.error("❌ Échec de la déconnexion");
      const data = await response.json();

      return { error: data.message ?? "Erreur de connexion" };
   }
}
