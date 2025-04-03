import { useMemo } from "react"
import { EMOTION_ITEMS } from "../../constants"
import { EmotionKorNameType, EmotionReportResponse } from "../../types/emotion"
import EmotionCard from "../EmotionCard/EmotionCard"

interface EmotionGridProps {
  emotionReport: EmotionReportResponse | undefined
  mostEmotion: EmotionKorNameType | null
}

const EmotionGrid = ({ emotionReport, mostEmotion }: EmotionGridProps) => {
  const sortedEmotionReport = useMemo(() => {
    return EMOTION_ITEMS.sort((a, b) => {
      return (
        (emotionReport?.[b.engName] as number) -
        (emotionReport?.[a.engName] as number)
      )
    })
  }, [emotionReport])

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {sortedEmotionReport.map((emotion) => (
        <EmotionCard
          key={emotion.id}
          emotion={emotion}
          count={emotionReport?.[emotion.engName] ?? 0}
          isMostEmotion={emotion.korName === mostEmotion}
        />
      ))}
    </div>
  )
}

export default EmotionGrid
