import { useMutation } from "@tanstack/react-query"
import { fetchEmotionAnalysis } from "../api/emotion"

const useEmotionAnalysis = (content: string) => {
  const mutate = useMutation({
    mutationFn: () => fetchEmotionAnalysis(content),
  })

  return mutate
}

export default useEmotionAnalysis
