import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js"; // ← import
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
   baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
   trustedOrigins: [
      "https://mikapp.debe2387.odns.fr",
      "http://mikapp.debe2387.odns.fr",
   ],

   database: prismaAdapter(prisma, {
      provider: "postgresql",
   }),
   emailAndPassword: {
      enabled: true,
   },
   advanced: {
      cookiePrefix: "monapp",
      useSecureCookies: false,
      trustProxy: true
   },
   session: {
      cookieCache: {
         enabled: true,
         maxAge: 5 * 60,
      },
   },
   user: {
      additionalFields: {
         role: {
            type: "string",
            required: false,
            defaultValue: "GUEST",
            input: false, // ← non modifiable par l'utilisateur
         },
      },
   },
   plugins: [
      nextCookies(), // ← doit être le dernier plugin du tableau
   ],
});

export type Session = typeof auth.$Infer.Session;
