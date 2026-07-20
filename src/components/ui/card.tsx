import * as React from "react";

import { cn } from "@/lib/utils";

function Card({
   className,
   size = "default",
   ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
   return (
      <div
         data-slot="card"
         data-size={size}
         className={cn(
            "group/card flex flex-col justify-center py-4 border-3 rounded-2xl text-sm text-card-foreground cursor-pointer",
            className,
         )}
         {...props}
      />
   );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         data-slot="card-header"
         className={cn(
            "group/card-header @container/card-header flex flex-col gap-1 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
            className,
         )}
         {...props}
      />
   );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         data-slot="card-title"
         className={cn(
            "text-center text-xl leading-normal group-data-[size=sm]/card:text-2xl font-extrabold",
            className,
         )}
         {...props}
      />
   );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         data-slot="card-description"
         className={cn("text-xs text-muted-foreground text-center", className)}
         {...props}
      />
   );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         data-slot="card-action"
         className={cn(
            "flex align-center justify-center",
            className,
         )}
         {...props}
      />
   );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         data-slot="card-content"
         className={cn("px-(--card-spacing)", className)}
         {...props}
      />
   );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         data-slot="card-footer"
         className={cn(
            "flex items-center rounded-b-xl px-(--card-spacing) [.border-t]:pt-(--card-spacing)",
            className,
         )}
         {...props}
      />
   );
}

export {
   Card,
   CardHeader,
   CardFooter,
   CardTitle,
   CardAction,
   CardDescription,
   CardContent,
};
