import Button from "@/components/Button/Button"
import EmLoading from "@/components/EmLoading/EmLoading"
import EmSection from "@/components/EmSection/EmSection"
import EmotionAnalysis from "@/features/emotion/components/EmotionAnalysis/EmotionAnalysis"
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
  const { emotionAnalysisData, setEmotionAnalysisData } = usePostForm()
  const { mutateAsync, isPending } = useEmotionAnalysis(content)

  useEffect(() => {
    if (content && !emotionAnalysisData) {
      handleAnalysis()
    }
  }, [content, emotionAnalysisData])

  const handleAnalysis = async () => {
    try {
      const res = await mutateAsync()
      setEmotionAnalysisData(res)
    } catch (error) {
      return <EmotionAnalysisError />
    }
  }

  return (
    <>
      {isPending ? (
        <div className="w-full h-full p-20 ">
          <EmLoading description="AI가 감정을 분석 중입니다..." />
        </div>
      ) : emotionAnalysisData ? (
        <StepAnimateLayout>
          <EmotionAnalysis data={emotionAnalysisData} />
          <EmotionSelector />
        </StepAnimateLayout>
      ) : (
        <EmSection className="max-h-fit">
          <EmSection.Header
            title="✨ AI 감정 분석"
            description="AI로 감정을 분석해보세요"
          />
          <div className="flex justify-center items-center">
            <Button
              className="w-full"
              onClick={handleAnalysis}
              type="button"
              variant="outline">
              분석하기
            </Button>
          </div>
        </EmSection>
      )}
    </>
  )
}
export default EmotionAnalysisContainer
