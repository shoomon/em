import apiClient from "@/utils/http-common"

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
export const fetchGetEmotionStatistics = async () => {
  const response = await apiClient.get("/emotions/statistics")
  return response.data
}
