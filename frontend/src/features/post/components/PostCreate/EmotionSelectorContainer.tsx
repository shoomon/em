import EmLoading from "@/components/EmLoading/EmLoading"
import { createPortal } from "react-dom"
import EmotionSelector from "./EmotionSelector"

interface EmotionSelectorContainerProps {
  content: string
  onEmotionChange: (_emotion: string) => void
  emotionState: string
}

const EmotionSelectorContainer = ({
  content,
  onEmotionChange,
  emotionState,
}: EmotionSelectorContainerProps) => {
  // const { data, isLoading, isSuccess } = useEmotionAnalysis(content)

  const loadingComponent = createPortal(
    <EmLoading
      className="text-em-white w-full h-full absolute z-50 top-0 left-0 bg-em-black/30"
      description="작성한 글을 바탕으로 AI로 감정을 분석 중입니다..."
    />,
    document.body,
  )
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* {isLoading ? (
        loadingComponent
      ) : isSuccess ? (
        <EmotionAnalysis data={data} />
      ) : (
        <>
          <EmotionAnalysisError />
        </>
      )}
      {!isLoading && (
        <EmotionSelector
          onEmotionChange={onEmotionChange}
          emotionState={emotionState}
        />
      )} */}
      <EmotionSelector
        onEmotionChange={onEmotionChange}
        emotionState={emotionState}
      />
    </div>
  )
}
export default EmotionSelectorContainer
