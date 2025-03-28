import { useQuery } from "@tanstack/react-query"
import { fetchGetEmotions } from "../api/emotion"
import { Emotion } from "../types/emotion"

const useEmotions = () => {
  return useQuery<Emotion[]>({
    queryKey: ["emotions"],
    queryFn: fetchGetEmotions,
    staleTime: Infinity, // 단 한번만 가져오고 항상 캐시된 데이터 사용
  })
}

export default useEmotions
