import { Progress } from "@/components/Progress/Progress"
import type { FC } from "react"
import { usePostFormState } from "../../contexts/PostFormContext"
import { PostCreateStep } from "../../types/post"

interface PostCreateProgressProps {}

const PostCreateProgress: FC<PostCreateProgressProps> = ({}) => {
  const { currentStep } = usePostFormState()
  return (
    <div className="w-full relative">
      <Progress
        className="w-full max-w-[600px] fixed z-50 top-[calc(var(--header-height)-0.2rem)] rounded-none h-1"
        value={(currentStep / Object.keys(PostCreateStep).length) * 100 * 2}
      />
    </div>
  )
}
export default PostCreateProgress
