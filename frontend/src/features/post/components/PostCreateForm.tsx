import StepAnimateLayout from "@/layout/StepAnimateLayout"
import { useEffect, useState } from "react"
import usePostForm from "../hooks/usePostForm"
import { PostCreateStep } from "../types/post"
import EmotionSelector from "./EmotionSelector"
import MapSelector from "./MapSelector"
import NextStepButtonSection from "./NextStepButtonSection"
import PostConfirm from "./PostConfirm"
import PostContentInput from "./PostContentInput"

const PostCreateForm = () => {
  const {
    //
    isSubmitPending,
    currentStep,
    formData,
    updateFormData,
    handleSubmit,
    handleMapChange,
    updateStep,
    isFormDataValid,
  } = usePostForm()

  const [animatedStep, setAnimatedStep] = useState(currentStep)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedStep(currentStep) // 애니메이션 끝난 후 스텝 변경
    }, 200)

    return () => clearTimeout(timeout)
  }, [currentStep])

  // 현재 스탭 컴포넌트
  const STEP_COMPONENTS = {
    [PostCreateStep.Map]: <MapSelector onMapChange={handleMapChange} />,
    [PostCreateStep.Emotion]: (
      <EmotionSelector
        emotionState={formData.emotion}
        onEmotionChange={(emotion) => updateFormData("emotion", emotion)}
      />
    ),
    [PostCreateStep.Content]: (
      <PostContentInput
        onTextChange={(text) => updateFormData("content", text)}
        textState={formData.content}
      />
    ),
    [PostCreateStep.Confirm]: <PostConfirm formData={formData} />,
  }

  if (isSubmitPending) {
    return <div>Loading...</div>
  }

  return (
    <form className="h-full" onSubmit={handleSubmit}>
      <div className="flex w-full flex-col justify-between h-[calc(100dvh-var(--header-height))]">
        {/* 현재 스탭 컴포넌트 */}
        <div className="flex flex-1">
          <StepAnimateLayout>{STEP_COMPONENTS[animatedStep]}</StepAnimateLayout>
        </div>
        {/* 버튼 컴포넌트 */}
        <NextStepButtonSection
          isFormDataValid={isFormDataValid}
          currentStep={currentStep}
          updateStep={updateStep}
        />
      </div>
    </form>
  )
}
export default PostCreateForm
