import usePostStore from "@/store/usePostStore"
import { useQuery } from "@tanstack/react-query"
import { fetchPost } from "../api/postApi"
import { Post, PostListType } from "../types/post"

interface UsePostProps {
  type: PostListType
}

const usePost = ({ type }: UsePostProps) => {
  const postId = usePostStore((state) => state.postId)
  const { data, isLoading } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    refetchOnWindowFocus: false,
    enabled: type === "marker",
  })

  return { data, isLoading }
}

export default usePost
