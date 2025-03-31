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
