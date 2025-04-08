import { memo, useMemo } from "react"
import { usePostFormState } from "../../contexts/PostFormContext"
import EmotionAnalysisContainer from "./EmotionAnalysisContainer"
import EmotionSelector from "./EmotionSelector"

interface EmotionSelectorContainerProps {}

const EmotionSelectorContainer = ({}: EmotionSelectorContainerProps) => {
  const { formData } = usePostFormState()

  const isOnlyMusic = useMemo(() => {
    return formData.musicId && formData.content === ""
  }, [formData])

  return (
    <div className="flex flex-col gap-4 w-full">
      {isOnlyMusic ? (
        <EmotionSelector />
      ) : (
        <EmotionAnalysisContainer content={formData.content} />
      )}
    </div>
  )
}
export default memo(EmotionSelectorContainer)
