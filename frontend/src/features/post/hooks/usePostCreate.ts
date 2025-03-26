import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchPostCreate } from "../api/postApi"
import { PostCreateRequest } from "../types/post"
const usePostCreate = () => {
  const queryClient = useQueryClient()

  const {
    mutateAsync: createPostAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (data: PostCreateRequest) => {
      return fetchPostCreate(data)
    },
    onSuccess: () => {
      // 기존 게시글 호출 갱신
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  return { createPostAsync, isPending, isError, isSuccess }
}

export default usePostCreate
