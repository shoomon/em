import EmSection from "@/components/EmSection/EmSection"
import EmTextArea from "@/components/EmTextArea/EmTextArea"
import { memo } from "react"
import {
  usePostFormAction,
  usePostFormState,
} from "../../contexts/PostFormContext"

type PostContentInputProps = {}

const PostContentInput = ({}: PostContentInputProps) => {
  const { formData } = usePostFormState()
  const { updateFormData } = usePostFormAction()

  const { content: textState } = formData

  const handleTextChange = (text: string) => {
    updateFormData("content", text)
  }
  return (
    <EmSection className="h-full">
      <EmSection.Header title="✨ 마음을 적어주세요" />
      <div className="h-full">
        <EmTextArea
          placeholder="현재 어떤 생각을 하고 있나요?"
          className="h-full"
          onTextChange={handleTextChange}
          textState={textState}
        />
      </div>
    </EmSection>
  )
}
export default memo(PostContentInput)
