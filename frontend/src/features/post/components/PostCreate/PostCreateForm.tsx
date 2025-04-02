import EmLoading from "@/components/EmLoading/EmLoading"
import StepAnimateLayout from "@/layout/StepAnimateLayout"
import { useEffect, useState } from "react"
import {
  usePostFormAction,
  usePostFormState,
} from "../../contexts/PostFormContext"
import { PostCreateStep } from "../../types/post"
import NextStepButtonSection from "../NextStepButtonSection"
import EmotionSelectorContainer from "./EmotionSelectorContainer"
import MapSelector from "./MapSelector"
import PostConfirm from "./PostConfirm"
import PostContentsContainer from "./PostContentsContainer"

const PostCreateForm = () => {
  const { currentStep, isSubmitPending } = usePostFormState()
  const { handleSubmit } = usePostFormAction()

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
      <MapSelector setIsButtonDisabled={setIsButtonDisabled} />
    ),
    [PostCreateStep.Emotion]: <EmotionSelectorContainer />,
    [PostCreateStep.Content]: <PostContentsContainer />,
    [PostCreateStep.Confirm]: <PostConfirm />,
  }

  if (isSubmitPending) {
    return <EmLoading />
  }

  return (
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-start w-full h-full">
        {/* 현재 스탭 컴포넌트 */}
        <div className="flex basis-full">
          <StepAnimateLayout>{STEP_COMPONENTS[animatedStep]}</StepAnimateLayout>
        </div>
        {/* 버튼 컴포넌트 */}
        <NextStepButtonSection
          currentStep={currentStep}
          isButtonDisabled={isButtonDisabled}
        />
      </div>
    </form>
  )
}
export default PostCreateForm
