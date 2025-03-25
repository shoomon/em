import StepAnimateLayout from "@/layout/StepAnimateLayout"
import usePostForm from "../hooks/usePostForm"
import { PostCreateStep } from "../types/post"
import EmotionSelector from "./EmotionSelector"
import MapSelector from "./MapSelector"
import NextStepButtonSection from "./NextStepButtonSection"
import PostContentInput from "./PostContentInput"

const PostCreateForm = () => {
  const {
    //
    currentStep,
    formData,
    updateFormData,
    handleSubmit,
    handleMapChange,
    updateStep,
  } = usePostForm()

  // 현재 스탭 컴포넌트
  const STEP_COMPONENTS = {
    [PostCreateStep.Map]: <MapSelector onMapChange={handleMapChange} />,
    [PostCreateStep.Emotion]: (
      <EmotionSelector onEmotionChange={(emotion) => updateFormData("emotion", emotion)} />
    ),
    [PostCreateStep.Content]: (
      <PostContentInput
        onTextChange={(text) => updateFormData("content", text)}
        textState={formData.content}
      />
    ),
  }

  return (
    <form className="h-full" onSubmit={handleSubmit}>
      <div className="flex w-full flex-col h-full justify-between">
        {/* 현재 스탭 컴포넌트 */}
        <div className="flex flex-1">
          <StepAnimateLayout>{STEP_COMPONENTS[currentStep]}</StepAnimateLayout>
        </div>
        {/* 버튼 컴포넌트 */}
        <NextStepButtonSection currentStep={currentStep} updateStep={updateStep} />
      </div>
    </form>
  )
}
export default PostCreateForm
