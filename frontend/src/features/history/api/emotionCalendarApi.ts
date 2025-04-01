import apiClient from "@/utils/http-common"
import { EmotionCalendarResponse } from "../types/emotionCalendar"
import { Post } from "@/features/post/types/post"

export const fetchEmotionCalendar = async (
  month: string,
): Promise<EmotionCalendarResponse> => {
  const res = await apiClient.get<EmotionCalendarResponse>(
    `/posts/calendar?month=${month}`,
  )
  return res.data
}

export const fetchPostsByDate = async (date: string): Promise<Post[]> => {
  const res = await apiClient.get<{ postList: Post[] }>(
    `/posts/date?date=${date}`,
  )
  return res.data.postList
}
