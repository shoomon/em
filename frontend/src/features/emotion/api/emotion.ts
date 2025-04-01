import apiClient from "@/utils/http-common"
import { EmotionReportResponse } from "../types/emotion"

// 전체 감정 조회
export const fetchGetEmotions = async () => {
  const response = await apiClient.get("/emotions")
  return response.data
}

// 단일 감정 조회
export const fetchGetEmotion = async (id: string) => {
  const response = await apiClient.get(`/emotions/${id}`)
  return response.data
}

// 감정 분석 조회
export const fetchGetEmotionAnalysis = async () => {
  const response = await apiClient.get("/emotions/analysis")
  return response.data
}

// 이 달의 감정 통계 조회
export const fetchGetEmotionReport = async (
  month: string,
): Promise<EmotionReportResponse> => {
  const response = await apiClient.get("/posts/report", {
    params: { month },
  })

  return response.data?.emotionCount
}
