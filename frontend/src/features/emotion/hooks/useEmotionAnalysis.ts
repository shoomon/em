import { useMutation } from "@tanstack/react-query"
import { fetchEmotionAnalysis } from "../api/emotion"

const useEmotionAnalysis = (content: string) => {
  const mutate = useMutation({
    mutationFn: () => fetchEmotionAnalysis(content),
    onSuccess: async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return data
    },
    onError: (error) => {
      console.log("실패", error)
    },
  })

  return mutate
}

export default useEmotionAnalysis
