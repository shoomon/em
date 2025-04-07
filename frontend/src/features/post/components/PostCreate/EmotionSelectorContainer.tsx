import { memo } from "react"
import { usePostFormState } from "../../contexts/PostFormContext"
import EmotionAnalysisContainer from "./EmotionAnalysisContainer"

interface EmotionSelectorContainerProps {}

const EmotionSelectorContainer = ({}: EmotionSelectorContainerProps) => {
  const { formData } = usePostFormState()

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <EmotionAnalysisContainer content={formData.content} />
      {/* <EmotionSelector /> */}
    </div>
  )
}
export default memo(EmotionSelectorContainer)
