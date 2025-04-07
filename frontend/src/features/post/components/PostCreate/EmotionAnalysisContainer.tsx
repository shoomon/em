import EmLoading from "@/components/EmLoading/EmLoading"
import EmotionAnalysis from "@/features/emotion/components/EmotionAnalysis/EmotionAnalysis"
import useCurseAnalysis from "@/features/emotion/hooks/useCurseAnalysis"
import useEmotionAnalysis from "@/features/emotion/hooks/useEmotionAnalysis"
import StepAnimateLayout from "@/layout/StepAnimateLayout"
import { useEffect } from "react"
import { usePostForm } from "../../contexts/PostFormContext"
import EmotionAnalysisError from "./EmotionAnalysisError"
import EmotionSelector from "./EmotionSelector"

interface EmotionAnalysisContainerProps {
  content: string
}

const EmotionAnalysisContainer = ({
  content,
}: EmotionAnalysisContainerProps) => {
  const { emotionAnalysisData, setEmotionAnalysisData, isCurse, setIsCurse } =
    usePostForm()
  const { mutateAsync, isPending } = useEmotionAnalysis(content)
  const { mutateAsync: curseAnalysisAsync, isPending: isCursePending } =
    useCurseAnalysis()

  const handleAnalysis = async () => {
    try {
      const res = await mutateAsync()
      setEmotionAnalysisData(res)
      const { isCurse, confidence } = await curseAnalysisAsync(content)
      if (isCurse && confidence > 0.8) {
        setIsCurse(true)
      } else {
        setIsCurse(false)
      }
    } catch (error) {
      return <EmotionAnalysisError />
    }
  }

  useEffect(() => {
    if (content && !emotionAnalysisData && !isCurse) {
      handleAnalysis()
    }
  }, [content])

  return (
    <>
      {isPending || isCursePending ? (
        <div className="w-full h-full p-20 ">
          <EmLoading description="AI가 감정을 분석 중입니다..." />
        </div>
      ) : (
        emotionAnalysisData &&
        isCurse !== undefined && (
          <StepAnimateLayout>
            <EmotionAnalysis data={emotionAnalysisData} />
            <EmotionSelector />
          </StepAnimateLayout>
        )
      )}
    </>
  )
}
export default EmotionAnalysisContainer
