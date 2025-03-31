import { useQuery } from "@tanstack/react-query"
import { fetchGetEmotionAnalysis } from "../api/emotion"

const useEmotionAnalysis = (content: string) => {
  return useQuery({
    queryKey: ["emotionAnalysis", content],
    queryFn: () => fetchGetEmotionAnalysis(),
  })
}

export default useEmotionAnalysis
