import usePostStore from "@/store/usePostStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchPost, fetchPostDelete } from "../api/postApi"
import { Post, PostListType } from "../types/post"
import { toast } from "sonner"

interface UsePostProps {
  type: PostListType
}

const usePost = ({ type }: UsePostProps) => {
  const postId = usePostStore((state) => state.postId)
  const setPostId = usePostStore((state) => state.setPostId)
  const queryClient = useQueryClient()

  // 게시글 조회
  const { data, isPending } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    enabled: type === "marker" && postId > 0,
    retry: 0,
  })

  // 게시글 삭제
  const mutation = useMutation({
    mutationFn: () => fetchPostDelete(postId),
    onMutate: () => {
      if (!window.confirm("정말 삭제하시겠습니까?")) {
        throw new Error()
      }
    },
    onSuccess: () => {
      setPostId(0)
      queryClient.refetchQueries({ queryKey: ["points"], exact: false })
      toast.success("해당 게시글이 삭제 되었습니다.")
    },
    retry: 0,
  })

  return {
    data: postId ? data : null,
    isPending: postId ? isPending : false,
    mutation,
  }
}

export default usePost
