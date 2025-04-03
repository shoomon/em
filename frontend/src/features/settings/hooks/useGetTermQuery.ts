import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchTerm } from "../api/term"
import { Term } from "../types/terms.type"

const useGetTermQuery = (id: number): UseQueryResult<Term> => {
  return useQuery({
    queryKey: ["terms", id],
    queryFn: () => fetchTerm(id),
    staleTime: 1000 * 60 * 60 * 24, // 24시간
    gcTime: 1000 * 60 * 60 * 24, // 24시간
  })
}

export default useGetTermQuery
