import EmSection from "@/components/EmSection/EmSection"
import EmotionSelectItem from "@/features/emotion/components/EmotionSelectItem"
import { EMOTION_ITEMS } from "@/features/emotion/constants"
import useEmotions from "@/features/emotion/hooks/useEmotions"
import { useMemo } from "react"
import {
  usePostFormAction,
  usePostFormState,
} from "../../contexts/PostFormContext"

interface EmotionSelectorProps {}

const EmotionSelector = ({}: EmotionSelectorProps) => {
  const { formData } = usePostFormState()
  const { updateFormData, handleIsSelected } = usePostFormAction()
  const { data: emotions } = useEmotions()

  const { emotion: emotionState } = formData

  const handleEmotionSelect = (emotionId: string) => {
    updateFormData("emotion", emotionId)
    handleIsSelected(true)
  }

  const filteredEmotions = useMemo(() => {
    return EMOTION_ITEMS?.filter(({ engName }) => {
      return emotions?.find(
        ({ engName: emotionEngName }) => emotionEngName === engName,
      )
    })
  }, [emotions])

  return (
    <EmSection>
      <EmSection.Header
        title="😇 현재 감정을 선택해 주세요"
        description="분석 결과가 맞지 않다면 원하는 감정을 선택해 주세요!"
      />
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {filteredEmotions.map((emotion) => (
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
