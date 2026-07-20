// use-query.ts — hook générique sans contrainte tableau
import { useQuery } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";

export function useDataQuery<T>(queryKey: QueryKey, queryFn: () => Promise<T>) {
   return useQuery({ queryKey, queryFn });
}
