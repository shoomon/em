import { EmotionEngNameType } from "@/features/emotion/types/emotion"
import { fetchRecommendMusic } from "@/features/recommend/api/recommendApi"
import { useQuery } from "@tanstack/react-query"

const useMusicChart = (category: EmotionEngNameType) => {
  const { data, isPending } = useQuery({
    queryKey: ["music-chart", category],
    queryFn: async () => {
      const emotionCounts = {
        ANGER: 0,
        SURPRISE: 0,
        JOY: 0,
        SADNESS: 0,
        FEAR: 0,
        NEUTRAL: 0,
        TRUST: 0,
        ANTICIPATION: 0,
        DISGUST: 0,
        [category]: 1,
      }
      const response = await fetchRecommendMusic(emotionCounts, 10)
      return response.data
    },
    refetchOnWindowFocus: false,
    retry: 0,
  })

  return { data, isPending }
}

export default useMusicChart
