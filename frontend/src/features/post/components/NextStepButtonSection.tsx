import Button from "@/components/Button/Button"
import { PostCreateStep } from "../types/post"

type NextStepButtonProps = {
  updateStep: (step: PostCreateStep) => void
  currentStep: PostCreateStep
  isFormDataValid: (step: PostCreateStep) => boolean | undefined
  isButtonDisabled: boolean
}

const NextStepButtonSection = ({
  updateStep,
  currentStep,
  isFormDataValid,
  isButtonDisabled,
}: NextStepButtonProps) => {
  const isFirstStep = currentStep === PostCreateStep.Map
  const isLastStep = currentStep === PostCreateStep.Confirm
  const isMiddleStep = !isFirstStep && !isLastStep

  return (
    <div className="flex gap-2 mb-7 px-4 bg-em-white">
      {isMiddleStep && (
        <Button
          variant="outline"
          type="button"
          className="flex-1"
          onClick={() => updateStep(currentStep - 1)}>
          이전
        </Button>
      )}

      {!isLastStep && (
        <Button
          className="flex-1"
          variant={
            isButtonDisabled
              ? "disabled"
              : isFormDataValid(currentStep)
                ? "default"
                : "disabled"
          }
          disabled={isButtonDisabled ? true : !isFormDataValid(currentStep)}
          type="button"
          onClick={() => updateStep(currentStep + 1)}>
          다음
        </Button>
      )}

      {isLastStep && (
        <>
          <Button
            variant="outline"
            type="button"
            className="flex-1"
            onClick={() => updateStep(currentStep - 1)}>
            이전
          </Button>
          <Button className="flex-1" type="submit">
            올리기
          </Button>
        </>
      )}
    </div>
  )
}
export default NextStepButtonSection
