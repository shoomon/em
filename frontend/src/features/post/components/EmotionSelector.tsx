import EmSection from "@/components/EmSection/EmSection"
import EmotionSelectItem from "@/features/emotion/components/EmotionSelectItem"
import { EMOTION_ITEMS } from "@/features/emotion/constants"

type EmotionSelectorProps = {
  onEmotionChange: (_emotion: string) => void
  emotionState: string
}

const EmotionSelector = ({
  onEmotionChange,
  emotionState,
}: EmotionSelectorProps) => {
  const handleEmotionSelect = (emotionId: string) => {
    onEmotionChange(emotionId)
  }

  return (
    <EmSection>
      <EmSection.Header
        title="😇 감정 선택"
        description="당신의 감정은 어떠신가요?"
      />
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EMOTION_ITEMS.map((emotion) => (
            <EmotionSelectItem
              key={emotion.engName}
              onSelect={handleEmotionSelect}
              isSelected={emotionState === emotion.engName}
              emotion={emotion}
            />
          ))}
        </div>
      </div>
    </EmSection>
  )
}

export default EmotionSelector
