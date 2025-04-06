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
        <div className="w-full bg-em-anger text-center py-4 text-em-white">
          ⚠️ 작성하신 글에는 비속어가 포함되어 있습니다.
        </div>
      )}
    </>
  )
}
export default memo(CurseWarningBanner)
