
import { Site } from "../prisma/generated/enums";

export function siteVisibleWhere(site?: Site) {
   return site ? { sites: { some: { site, visible: true } } } : {};
}
