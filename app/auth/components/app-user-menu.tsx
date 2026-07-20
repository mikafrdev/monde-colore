"use client";

import Link from "next/link";
import { User, User2 } from "lucide-react";
import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignInForm } from "@auth/signin/signin-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { signOutAction } from "../signout/signout-action";
import { toast } from "sonner";

type Session = typeof auth.$Infer.Session;

export default function AppUserMenu({ session }: { session: Session | null }) {
   const [open, setOpen] = useState(false);
   const router = useRouter();
   const user = session?.user ?? null;

   const handleSignOut = async () => {
      const result = (await signOutAction()) as { error?: string };

      if (result.error) {
         console.error("❌ Erreur lors de la déconnexion :", result.error);
         toast.error(result.error);
         return;
      }

      // Déconnexion réussie, rafraîchir la page
      console.log("✅ Déconnexion réussie");
      toast.success("Déconnexion réussie !");

      /* router.push("/"); */
      router.refresh();
   };

   if (user) {
      return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Avatar className="cursor-pointer">
                  <AvatarImage src={user.image ?? ""} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                     {user.name ? (
                        user.name.charAt(0).toUpperCase()
                     ) : (
                        <User className="h-4 w-4" />
                     )}
                  </AvatarFallback>
               </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
               <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                  <Link href="/auth">Mon compte</Link>
               </DropdownMenuItem>
               <DropdownMenuItem asChild>
                  <Link href="/administration">Administration</Link>
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem
                  className="text-red-500"
                  onSelect={handleSignOut}
               >
                  Déconnexion
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      );
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <User2 className="cursor-pointer" />
         </DialogTrigger>
         <DialogContent className="sm:max-w-sm">
            <DialogHeader>
               <DialogTitle className="flex justify-center py-5">
                  Identification
               </DialogTitle>
               <DialogDescription>
                  Connectez-vous à votre compte pour accéder à votre espace
                  personnel.
               </DialogDescription>
            </DialogHeader>
            <SignInForm onSuccess={() => setOpen(false)} />
         </DialogContent>
      </Dialog>
   );
}
