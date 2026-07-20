import { z } from "zod";
import { Role } from "@/lib/prisma/generated/enums";

export const SignInFormSchema = z.object({
   email: z.email(),
   password: z.string().min(8),
});

export const SignUpFormSchema = z.object({
   name: z.string().min(1, "Le pseudo est requis"),
   email: z.email("Email invalide"),
   password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
   role: z.enum(Role),
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;
export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
