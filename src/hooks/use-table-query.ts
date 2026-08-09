import { useQuery, type QueryKey } from "@tanstack/react-query";

export function useTableQuery<T>(
   queryKey: QueryKey,
   queryFn: () => Promise<T[]>,
) {
   return useQuery({
      queryKey,
      queryFn,
   });
}
