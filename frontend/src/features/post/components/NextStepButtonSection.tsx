import Button from "@/components/Button/Button"
import { PostCreateStep } from "../types/post"

type NextStepButtonProps = {
  updateStep: (step: PostCreateStep) => void
  currentStep: PostCreateStep
}

const NextStepButtonSection = ({ updateStep, currentStep }: NextStepButtonProps) => {
  const isFirstStep = currentStep === PostCreateStep.Map
  const isLastStep = currentStep === PostCreateStep.Emotion
  const isMiddleStep = !isFirstStep && !isLastStep

  return (
    <div className="flex gap-2 mb-10 px-4">
      {isMiddleStep && (
        <Button
          variant="outline"
          type="button"
          className="flex-1"
          onClick={() => updateStep(currentStep - 1)}>
          이전 스텝으로
        </Button>
      )}

      {!isLastStep && (
        <Button className="flex-1" type="button" onClick={() => updateStep(currentStep + 1)}>
          다음 스텝으로
        </Button>
      )}

      {isLastStep && (
        <>
          <Button
            variant="outline"
            type="button"
            className="flex-1"
            onClick={() => updateStep(currentStep - 1)}>
            이전 스텝으로
          </Button>
          <Button className="flex-1" type="submit">
            게시글 작성하기
          </Button>
        </>
      )}
    </div>
  )
}
export default NextStepButtonSection
