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
      <EmSection.Header title="글 작성" />
      <div className="h-full">
        <EmTextArea
          className="h-full"
          onTextChange={onTextChange}
          textState={textState}
        />
      </div>
    </EmSection>
  )
}
export default PostContentInput
