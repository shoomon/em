import { fetchRecommendMusic } from "@/features/recommend/api/recommendApi"
import { useQuery } from "@tanstack/react-query"
import useRecentEmotion from "./useRecentEmotion"

const useRecommendationMusic = () => {
  const { data: emotionCounts } = useRecentEmotion()
  const { data, isPending } = useQuery({
    queryKey: ["recommendation"],
    queryFn: async () => {
      const response = await fetchRecommendMusic(emotionCounts!, 20)
      return response.data
    },
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: !!emotionCounts,
  })

  return { data, isPending }
}

export default useRecommendationMusic
