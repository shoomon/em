import apiClient from "@/utils/http-common"

export const fetchMusicSearch = async (title: string) => {
  const response = await apiClient.get(`/spotify/search?q=${title}`)
  return response.data
}
