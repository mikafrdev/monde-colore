"use client";

import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";

export function SubmitButton({
   disabled,
   children,
   ...props
}: ComponentProps<typeof Button>) {
   return (
      <Button {...props} disabled={disabled}>
         {children}
      </Button>
   );
}
