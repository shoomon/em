import { fetchPostDelete } from "@/features/post/api/postApi"
import { Post } from "@/features/post/types/post"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchPostsByDate } from "../api/emotionCalendarApi"

export const useMyPostsByDate = (date: string) => {
  const { data, isLoading, refetch } = useQuery<Post[]>({
    queryKey: ["myPosts", date],
    queryFn: () => fetchPostsByDate(date),
  })
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (postId: number) => fetchPostDelete(postId),
    onMutate: () => {
      if (!window.confirm("정말 삭제하시겠습니까?")) {
        throw new Error()
      }
    },
    onSuccess: () => {
      refetch()
      queryClient.refetchQueries({ queryKey: ["myPosts"], exact: false })
      alert("해당 게시글이 삭제 되었습니다.")
    },
  })

  return {
    postList: data ?? [],
    isLoading,
    mutation,
  }
}
