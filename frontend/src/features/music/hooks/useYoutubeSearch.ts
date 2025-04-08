import { useQuery } from "@tanstack/react-query"
import { fetchYoutubeSearch } from "../api/musicApi"

const useYoutubeSearch = (query: string) => {
  const { data } = useQuery({
    queryKey: ["youtube", query],
    queryFn: () => fetchYoutubeSearch(query),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: !!query,
  })

  return { data }
}

export default useYoutubeSearch
