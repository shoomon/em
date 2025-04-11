import EmSection from "@/components/EmSection/EmSection"
import { usePostFormAction } from "@/features/post/contexts/PostFormContext"
import { cn } from "@/utils/cn"
import { useEffect } from "react"
import { EMOTION_ITEMS } from "../../constants"
import {
  EmotionAnalysisResponse,
  EmotionEngNameType,
} from "../../types/emotion"
import EmotionSelectItem from "../EmotionSelectItem"

interface EmotionAnalysisProps {
  data: EmotionAnalysisResponse | undefined
}

const mockEmotionScores = {
  label: "NEUTRAL",
  confidence: 0.8,
  all_probs: {
    ANGER: 0.0,
    SURPRISE: 0.2,
    JOY: 0.0,
    SADNESS: 0.0,
    FEAR: 0.0,
    NEUTRAL: 0.8,
  },
} as EmotionAnalysisResponse

const EmotionAnalysis = ({ data }: EmotionAnalysisProps) => {
  const { updateFormData } = usePostFormAction()

  // Top 3 감정 추출
  const topEmotions = Object.entries(data?.all_probs ?? mockEmotionScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([emotion]) => emotion) as EmotionEngNameType[]

  const percentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`
  }

  const handleEmotionSelect = (emotionId: string) => {
    updateFormData("emotion", emotionId)
  }

  useEffect(() => {
    if (data) {
      updateFormData("emotion", data.label)
    }
  }, [data])

  return (
    <EmSection className="max-h-fit pb-0">
      <EmSection.Header
        title="💡 감정 분석 결과"
        description="이전에 작성한 글을 바탕으로 분석한 결과예요"
      />

      <div className="flex gap-3">
        {topEmotions.map((emotionName) => {
          const emotion = EMOTION_ITEMS.find((e) => e.engName === emotionName)
          if (!emotion) return null

          const isMostEmotion = emotionName === data?.label

          return (
            <div
              key={emotionName}
              className="w-full flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-full flex opacity-70 scale-95",
                  isMostEmotion &&
                    `ring-2 ring-em-black rounded-lg opacity-100 scale-105`,
                )}>
                <EmotionSelectItem
                  onSelect={isMostEmotion ? handleEmotionSelect : undefined}
                  key={emotion.id}
                  emotion={emotion}
                />
              </div>
              <span
                className={cn(
                  "text-em-gray",
                  isMostEmotion && "text-em-black font-extrabold",
                )}>
                {percentage(data?.all_probs[emotionName] ?? 0)}
              </span>
            </div>
          )
        })}
      </div>
    </EmSection>
  )
}

export default EmotionAnalysis
