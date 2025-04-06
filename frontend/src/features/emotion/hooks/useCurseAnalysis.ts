import { useMutation } from "@tanstack/react-query"
import { fetchCurseAnalysis } from "../api/emotion"

const useCurseAnalysis = () => {
  const mutate = useMutation({
    mutationFn: (content: string) => fetchCurseAnalysis(content),
    onSuccess: async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 1600))
      return data.isCurse
    },
    onError: (error) => {
      console.error(error)
      return false
    },
  })

  return mutate
}

export default useCurseAnalysis
