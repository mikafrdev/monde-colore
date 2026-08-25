import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
   User,
   Mail,
   Calendar,
   Lock,
   Gamepad2,
   Camera,
   BookOpen,
   Music,
   Film,
   ShoppingBag,
   Map,
   Dumbbell,
   UserPlus,
} from "lucide-react";
import Link from "next/link";

const futureSections = [
   {
      name: "Bibliothèque",
      icon: BookOpen,
      description: "Vos livres et lectures en cours",
      soon: true,
   },
   {
      name: "Musique",
      icon: Music,
      description: "Playlists et artistes favoris",
      soon: true,
   },
   {
      name: "Cinéma",
      icon: Film,
      description: "Films vus et à voir",
      soon: true,
   },
   {
      name: "Jeux vidéo",
      icon: Gamepad2,
      description: "Votre ludothèque personnelle",
      soon: false,
   },
   {
      name: "Photos",
      icon: Camera,
      description: "Albums et galeries privées",
      soon: true,
   },
   {
      name: "Shopping",
      icon: ShoppingBag,
      description: "Listes d'envies et achats",
      soon: true,
   },
   {
      name: "Voyages",
      icon: Map,
      description: "Destinations visitées et à venir",
      soon: true,
   },
   {
      name: "Sport",
      icon: Dumbbell,
      description: "Suivi de vos activités sportives",
      soon: true,
   },
];

// Server Component : récupère la session côté serveur avant le rendu,
// selon le pattern officiel de la doc Better Auth (auth.api.getSession).
// Pas de "use client" ici, donc pas de useState/useEffect/onClick possibles
// directement dans ce fichier — si besoin d'interactivité, extraire un sous-composant client.
export default async function DashboardPage() {
   const session = await auth.api.getSession({ headers: await headers() });
   const user = session?.user ?? null;

   return (
      <div className="flex flex-col gap-8 p-6 max-w-3xl mx-auto border">
         {/* Statut connexion */}
         <div className="flex items-center gap-3">
            <div
               className={`w-2 h-2 rounded-full ${user ? "bg-green-500" : "bg-red-500"}`}
            />
            <span className="text-sm text-muted-foreground">
               {user ? "Connecté" : "Non connecté"}
            </span>
         </div>

         {/* Infos compte */}
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Mon compte
               </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
               {user ? (
                  <>
                     <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted text-lg font-medium">
                           {user.name?.charAt(0).toUpperCase() ?? "?"}
                        </div>
                        <div>
                           <p className="font-medium">{user.name}</p>
                           <p className="text-sm text-muted-foreground">
                              {user.email}
                           </p>
                        </div>
                     </div>

                     <Separator />

                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-2 text-sm">
                           <Mail className="h-4 w-4 text-muted-foreground" />
                           <span className="text-muted-foreground">Email</span>
                           <span className="ml-auto font-medium truncate">
                              {user.email}
                           </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                           <Calendar className="h-4 w-4 text-muted-foreground" />
                           <span className="text-muted-foreground">
                              Membre depuis
                           </span>
                           <span className="ml-auto font-medium">
                              {new Date(user.createdAt).toLocaleDateString(
                                 "fr-FR",
                                 {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                 },
                              )}
                           </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                           <Lock className="h-4 w-4 text-muted-foreground" />
                           <span className="text-muted-foreground">
                              Email vérifié
                           </span>
                           <span className="ml-auto">
                              <Badge
                                 variant={
                                    user.emailVerified ? "default" : "secondary"
                                 }
                              >
                                 {user.emailVerified ? "Oui" : "Non"}
                              </Badge>
                           </span>
                        </div>
                     </div>

                     <Separator />

                     <div className="flex flex-nowrap items-center gap-3 text-emerald-500">
                        <UserPlus className="h-4 w-4" />
                        <Link className="font-medium" href="/auth/signup">
                           Ajouter un compte
                        </Link>
                     </div>
                  </>
               ) : (
                  <p className="text-sm text-muted-foreground">
                     Connectez-vous pour accéder à votre compte.
                  </p>
               )}
            </CardContent>
         </Card>

         {/* Rubriques futures */}
         <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">Rubriques à venir</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
               {futureSections.map((section) => (
                  <Card
                     key={section.name}
                     className={`transition-opacity ${section.soon ? "opacity-50" : "opacity-100"}`}
                  >
                     <CardContent className="flex items-center gap-4 py-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                           <section.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">
                                 {section.name}
                              </p>
                              {section.soon && (
                                 <Badge variant="outline" className="text-xs">
                                    Bientôt
                                 </Badge>
                              )}
                           </div>
                           <p className="text-xs text-muted-foreground truncate">
                              {section.description}
                           </p>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   );
}
