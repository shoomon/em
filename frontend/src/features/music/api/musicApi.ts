import apiClient from "@/utils/http-common"
import axios from "axios"

export const fetchMusicSearch = async (title: string) => {
  const response = await apiClient.get(`/spotify/search?q=${title}`)
  return response.data
}

export const fetchYoutubeSearch = async (query: string) => {
  // baseURL이 다르기 때문에 apiClient가 아닌 axios.get을 이용
  const response = await axios.get(
    `/youtube-api/youtube/v3/search?part=id&regionCode=kr&type=video&videoCategoryId=10&topicId=/m/04rlf&videoEmbeddable=true&videoLicense=youtube&safeSearch=strict&key=${import.meta.env.VITE_YOUTUBE_DATA_API_KEY}&maxResults=1&q=${query}`,
  )
  return response.data
}
