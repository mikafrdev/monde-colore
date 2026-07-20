import { SignInForm } from "./signin-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { RandomVideo } from "./random-video";

interface Props {
   searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function SignInPage({ searchParams }: Props) {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (session) {
      const { callbackUrl } = await searchParams;
      redirect(callbackUrl ?? "/");
   }

   const { callbackUrl } = await searchParams;

   return (
      <div className="relative min-h-screen w-full flex items-center justify-center">
         <RandomVideo />

         <div className="absolute inset-0 bg-black/40 -z-10" />

         <div className="w-full max-w-2xs sm:max-w-sm space-y-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <h1 className="text-2xl font-semibold text-white">Connexion</h1>
            <SignInForm callbackUrl={callbackUrl ?? "/"} />
         </div>
      </div>
   );
}