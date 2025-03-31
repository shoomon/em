import { useQuery } from "@tanstack/react-query"
import { fetchGetEmotionStatistics } from "../api/emotion"

const useEmotionStatistics = () => {
  return useQuery({
    queryKey: ["emotionStatistics"],
    queryFn: fetchGetEmotionStatistics,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
    gcTime: 1000 * 60 * 60 * 24, // 24시간
  })
}

export default useEmotionStatistics
