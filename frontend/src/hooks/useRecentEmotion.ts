import { EmotionReportResponse } from "@/features/emotion/types/emotion"
import { fetchRecentEmotions } from "@/features/post/api/postApi"
import { useQuery } from "@tanstack/react-query"

const useRecentEmotion = () => {
  return useQuery({
    queryKey: ["recent-emotions"],
    queryFn: () => fetchRecentEmotions(),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 0,
    select: (data) => {
      return data.emotionCounts as EmotionReportResponse
    },
  })
}

export default useRecentEmotion
