import { ReactNode } from "react";

export type LayoutProps = {
   children: ReactNode;
};

import { Feature } from "./prisma";

export type AppFeaturedCardProps = {
   features: Feature[];
};
