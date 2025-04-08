import { EmotionReportResponse } from "@/features/emotion/types/emotion"
import apiClient from "@/utils/http-common"

export const fetchRecommendMusic = async (
  emotionCounts: EmotionReportResponse,
  limit?: number,
) => {
  return await apiClient.post("/recommendation/my", {
    emotionCounts,
    limit,
  })
}
