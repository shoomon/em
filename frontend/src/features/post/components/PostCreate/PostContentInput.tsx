import EmSection from "@/components/EmSection/EmSection"
import EmTextArea from "@/components/EmTextArea/EmTextArea"

type PostContentInputProps = {
  onTextChange: (_text: string) => void
  textState: string
}

const PostContentInput = ({
  onTextChange,
  textState,
}: PostContentInputProps) => {
  return (
    <EmSection className="h-full">
      <EmSection.Header title="✨ 마음을 적어주세요" />
      <div className="h-full">
        <EmTextArea
          placeholder="현재 어떤 생각을 하고 있나요?"
          className="h-full"
          onTextChange={onTextChange}
          textState={textState}
        />
      </div>
    </EmSection>
  )
}
export default PostContentInput
