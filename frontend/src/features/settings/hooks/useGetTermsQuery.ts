import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchTerms } from "../api/termApi"
import { Term } from "../types/terms.type"

const useGetTermsQuery = (): UseQueryResult<Term[]> => {
  return useQuery({
    queryKey: ["terms"],
    queryFn: () => fetchTerms(),
    staleTime: 1000 * 60 * 60 * 24, // 24시간
    gcTime: 1000 * 60 * 60 * 24, // 24시간
  })
}

export default useGetTermsQuery
