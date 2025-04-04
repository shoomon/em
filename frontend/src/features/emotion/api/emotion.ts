import apiClient from "@/utils/http-common"
import {
  CurseAnalysisResponse,
  EmotionAnalysisResponse,
  EmotionReportResponse,
} from "../types/emotion"

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

// 이 달의 감정 통계 조회
export const fetchGetEmotionReport = async (
  month: string,
): Promise<EmotionReportResponse> => {
  const response = await apiClient.get("/posts/report", {
    params: { month },
  })

  return response.data?.emotionCount
}

// 감정 분석 조회
export const fetchEmotionAnalysis = async (
  text: string,
): Promise<EmotionAnalysisResponse> => {
  const response = await apiClient.post("/detection/emotion", { text })
  return response.data
}

// 비속어 분석 조회
export const fetchCurseAnalysis = async (
  text: string,
): Promise<CurseAnalysisResponse> => {
  const response = await apiClient.post("/detection/curse", { text })
  return response.data
}
