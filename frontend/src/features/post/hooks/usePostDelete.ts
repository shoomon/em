import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchPostDelete } from "../api/postApi"

const usePostDelete = (postId: number) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => fetchPostDelete(postId),
    onMutate: () => {
      if (!window.confirm("정말 삭제하시겠습니까?")) {
        throw new Error()
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["points"] })
      queryClient.refetchQueries({ queryKey: ["posts"] })
      alert("해당 메시지가 삭제 되었습니다.")
    },
  })

  return mutation
}

export default usePostDelete
