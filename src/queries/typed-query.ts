// ─── Workaround typage Prisma 7 + $extends (accelerate) ───────────────────────
// https://github.com/prisma/prisma/issues/28580
// $extends() casse l'inférence de type sur les relations incluses.
// Ce helper restaure le typage correct — safe car la donnée réelle
// correspond bien à ArticleWithRelations au runtime, seul TS se trompe.

export function typed<T>(query: Promise<unknown>): Promise<T> {
   return query as Promise<T>;
}
