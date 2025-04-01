import EmLoading from "@/components/EmLoading/EmLoading"
import StepAnimateLayout from "@/layout/StepAnimateLayout"
import { useEffect, useState } from "react"
import usePostForm from "../../hooks/usePostForm"
import { PostCreateStep } from "../../types/post"
import NextStepButtonSection from "../NextStepButtonSection"
import EmotionSelectorContainer from "./EmotionSelectorContainer"
import MapSelector from "./MapSelector"
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false) // 버튼 비활성화 여부

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedStep(currentStep) // 애니메이션 끝난 후 스텝 변경
    }, 200)

    return () => clearTimeout(timeout)
  }, [currentStep])

  // 현재 스탭 컴포넌트
  const STEP_COMPONENTS = {
    [PostCreateStep.Map]: (
      <MapSelector
        onMapChange={handleMapChange}
        setIsButtonDisabled={setIsButtonDisabled}
      />
    ),
    [PostCreateStep.Emotion]: (
      <EmotionSelectorContainer
        content={formData.content}
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
    return <EmLoading />
  }

  return (
    <form className="h-full w-full" onSubmit={handleSubmit}>
      <div className="flex w-full flex-col justify-start h-full">
        {/* 현재 스탭 컴포넌트 */}
        <div className="flex basis-full">
          <StepAnimateLayout>{STEP_COMPONENTS[animatedStep]}</StepAnimateLayout>
        </div>
        {/* 버튼 컴포넌트 */}
        <NextStepButtonSection
          isFormDataValid={isFormDataValid}
          currentStep={currentStep}
          updateStep={updateStep}
          isButtonDisabled={isButtonDisabled}
        />
      </div>
    </form>
  )
}
export default PostCreateForm
