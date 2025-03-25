import EmSection from "@/components/EmSection/EmSection"
import EmTextArea from "@/components/EmTextArea/EmTextArea"
import EmotionSelectItem from "@/features/emotion/components/EmotionSelectItem"
import { EMOTION_ITEMS } from "@/features/emotion/constants"
import { EmotionItem } from "@/features/emotion/types/emotion"
import { PostCreateResponse } from "../types/post"

type PostConfirmProps = {
  formData: PostCreateResponse
}

const PostConfirm = ({ formData }: PostConfirmProps) => {
  return (
    <section className="flex flex-col w-full  space-y-6 p-4">
      {/* 내가 있는 위치 확인 */}
      <EmSection>
        <EmSection.Header title="내가 있는 위치" />
        <div className="flex justify-start  items-center w-full">{"지도"}</div>
      </EmSection>

      {/* 기존 EmotionSelector 컴포넌트 재사용 (readonly 모드) */}
      <EmSection>
        <EmSection.Header title="선택 한 감정" />
        <div className="flex justify-start  items-center w-full">
          <EmotionSelectItem
            onSelect={() => {}}
            isSelected={false}
            emotion={
              EMOTION_ITEMS.find((emotion) => emotion.id === formData.emotion) as EmotionItem
            }
          />
        </div>
      </EmSection>

      {/* 작성한 내용 */}
      <EmSection>
        <EmSection.Header title="작성한 내용" />
        <div className="flex justify-start  items-center w-full">
          <EmTextArea
            disabled
            textState={formData.content}
            placeholder="내용을 입력해주세요"
            className="min-h-0"
          />
        </div>
      </EmSection>
    </section>
  )
}

export default PostConfirm
