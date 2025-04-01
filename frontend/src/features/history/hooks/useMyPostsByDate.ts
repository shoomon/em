import { Post } from "@/features/post/types/post"
import { useQuery } from "@tanstack/react-query"
import { fetchPostsByDate } from "../api/emotionCalendarApi"

export const useMyPostsByDate = (date: string) => {
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ["myPosts", date],
    queryFn: () => fetchPostsByDate(date),
  })

  return {
    postList: data ?? [],
    isLoading,
  }
}
