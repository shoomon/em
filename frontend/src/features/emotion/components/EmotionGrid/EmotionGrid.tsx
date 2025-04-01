import { EMOTION_ITEMS } from "../../constants"
import { EmotionEngNameType, EmotionPercentages } from "../../types/emotion"
import EmotionCard from "../EmotionCard/EmotionCard"

interface EmotionGridProps {
  emotionPercentages: EmotionPercentages | undefined
}

const EmotionGrid = ({ emotionPercentages }: EmotionGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {EMOTION_ITEMS.map((emotion) => (
        <EmotionCard
          key={emotion.id}
          emotion={emotion}
          percentage={
            emotionPercentages?.[emotion.engName as EmotionEngNameType] ?? "0%"
          }
        />
      ))}
    </div>
  )
}
export default EmotionGrid
