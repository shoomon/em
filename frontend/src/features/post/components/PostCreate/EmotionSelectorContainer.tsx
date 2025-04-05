import EmLoading from "@/components/EmLoading/EmLoading"
import useEmotionAnalysis from "@/features/emotion/hooks/useEmotionAnalysis"
import { memo } from "react"
import { createPortal } from "react-dom"
import { usePostFormState } from "../../contexts/PostFormContext"
import EmotionSelector from "./EmotionSelector"

interface EmotionSelectorContainerProps {}

const EmotionSelectorContainer = ({}: EmotionSelectorContainerProps) => {
  const { formData } = usePostFormState()
  const mutate = useEmotionAnalysis(formData.content)

  const loadingComponent = createPortal(
    <EmLoading
      className="text-em-white w-full h-full absolute z-50 top-0 left-0 bg-em-black/30"
      description="작성한 글을 바탕으로 AI로 감정을 분석 중입니다..."
    />,
    document.body,
  )

  console.log(mutate, loadingComponent)
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <>
        {/* <EmotionAnalysis data={data} /> */}
        {/* <EmotionAnalysisError /> */}
      </>
      <EmotionSelector />
    </div>
  )
}
export default memo(EmotionSelectorContainer)
