import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { fetchGetEmotionReport } from "../api/emotion"
import {
  EmotionEngNameType,
  EmotionKorNameType,
  EmotionMapping,
  EmotionPercentages,
  EmotionReportResponse,
} from "../types/emotion"
import { engArrayToKorArray } from "../utils/emotionConverter"

const useEmotionReport = () => {
  const currentMonth = useMemo(() => {
    const date = new Date()
    return date.toISOString().slice(0, 7)
  }, [])

  const { data: emotionReport } = useQuery<EmotionReportResponse>({
    queryKey: ["emotionReport", currentMonth],
    queryFn: () => fetchGetEmotionReport(currentMonth),
    staleTime: 1000 * 60 * 60 * 24, // 24시간
    gcTime: 1000 * 60 * 60 * 24, // 24시간
  })

  // 감저 아이템 라벨
  const emotionItemsLabels = useMemo((): EmotionKorNameType[] => {
    if (emotionReport) {
      const engNames = Object.keys(emotionReport).sort(
        (a, b) =>
          emotionReport[a as EmotionEngNameType] -
          emotionReport[b as EmotionEngNameType],
      ) as EmotionEngNameType[]
      return engArrayToKorArray(engNames)
    }
    return []
  }, [emotionReport])

  // 감정 통계 데이터 추출
  const datasets = emotionItemsLabels.map((e) => {
    const engName = EmotionMapping[e as keyof typeof EmotionMapping]
    return emotionReport ? emotionReport[engName] : 0
  })

  // 총 감정 수
  const totalEmotions = datasets.reduce((a, b) => a + b, 0)

  // 가장 많은 감정
  const mostEmotion = emotionItemsLabels.find(
    (e) => datasets[emotionItemsLabels.indexOf(e)] === Math.max(...datasets),
  )

  // 감정 퍼센테이지 데이터 추출
  const emotionPercentages: EmotionPercentages = useMemo(() => {
    const percentages: EmotionPercentages = {
      ANGER: "0%",
      SURPRISE: "0%",
      JOY: "0%",
      TRUST: "0%",
      SADNESS: "0%",
      FEAR: "0%",
      ANTICIPATION: "0%",
      DISGUST: "0%",
    }

    if (!emotionReport) return percentages

    const engNames = Object.keys(emotionReport).sort(
      (a, b) =>
        emotionReport[a as EmotionEngNameType] -
        emotionReport[b as EmotionEngNameType],
    ) as EmotionEngNameType[]

    engNames.forEach((e) => {
      percentages[e] = new Intl.NumberFormat("ko-KR", {
        style: "percent",
      }).format(Math.round((emotionReport[e] / totalEmotions) * 100) / 100)
    })

    return percentages
  }, [emotionReport, totalEmotions])

  return {
    emotionReport,
    emotionItemsLabels,
    datasets,
    emotionPercentages,
    mostEmotion,
  }
}

export default useEmotionReport
