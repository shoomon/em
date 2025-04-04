import { useMutation } from "@tanstack/react-query"
import { fetchCurseAnalysis } from "../api/emotion"

const useCurseAnalysis = (content: string) => {
  const mutate = useMutation({
    mutationFn: () => fetchCurseAnalysis(content),
  })

  return mutate
}

export default useCurseAnalysis
