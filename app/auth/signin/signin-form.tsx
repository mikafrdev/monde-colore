"use client";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormSchema, SignInFormValues } from "@/lib/schemas/auth.schema";
import {
   Field,
   FieldError,
   FieldGroup,
   FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { SubmitButton } from "@/components/submit-button";
import { Loader2 } from "lucide-react";

export function SignInForm({
   onSuccess,
   callbackUrl = "/",
}: {
   onSuccess?: () => void;
   callbackUrl?: string;
}) {
   const router = useRouter();

   const form = useForm<SignInFormValues>({
      resolver: zodResolver(SignInFormSchema),
      defaultValues: { email: "", password: "" },
   });

   const { isSubmitting } = form.formState;

   async function onSubmit(values: SignInFormValues) {
      const { error } = await authClient.signIn.email({
         email: values.email,
         password: values.password,
      });

      if (error) {
         toast.error(error.message ?? "Erreur de connexion");
         return;
      }

      toast.success("Connexion réussie !");
      onSuccess?.();
      router.replace(callbackUrl);
   }

   return (
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
         <FieldGroup>
            <Controller
               name="email"
               control={form.control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name} className="text-white">
                        Email
                     </FieldLabel>
                     <Input
                        {...field}
                        id={field.name}
                        type="email"
                        aria-invalid={fieldState.invalid}
                        className="w-full py-6 placeholder:text-sm md:text-sm bg-white"
                     />
                     {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                     )}
                  </Field>
               )}
            />
            <Controller
               name="password"
               control={form.control}
               render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                     <FieldLabel htmlFor={field.name} className="text-white">
                        Mot de passe
                     </FieldLabel>
                     <Input
                        {...field}
                        id={field.name}
                        type="password"
                        aria-invalid={fieldState.invalid}
                        className="w-full py-6 md:text-sm bg-white"
                     />
                     {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                     )}
                  </Field>
               )}
            />
         </FieldGroup>

         <SubmitButton
            type="submit"
            className="w-full mt-10 mb-0 py-6"
            disabled={isSubmitting}
         >
            {isSubmitting ? (
               <>
                  <Loader2 className="animate-spin" />
                  Connexion...
               </>
            ) : (
               "Se connecter"
            )}
         </SubmitButton>
      </form>
   );
}