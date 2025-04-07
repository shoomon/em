import { memo } from "react"
import { usePostFormState } from "../../contexts/PostFormContext"
import { PostCreateStep } from "../../types/post"

interface CurseWarningBannerProps {}

const CurseWarningBanner = ({}: CurseWarningBannerProps) => {
  const { isCurse, currentStep } = usePostFormState()

  const isActive =
    (isCurse && currentStep === PostCreateStep.Confirm) ||
    (isCurse && currentStep === PostCreateStep.Emotion)

  return (
    <>
      {isActive && (
        <div className="w-full bg-em-anger font-light text-center py-3 text-em-white">
          ⚠️ 글에 비속어가 포함되어 있을 수 있어요!
        </div>
      )}
    </>
  )
}
export default memo(CurseWarningBanner)
