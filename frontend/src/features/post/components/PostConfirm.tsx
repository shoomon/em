import EmSection from "@/components/EmSection/EmSection"
import EmTextArea from "@/components/EmTextArea/EmTextArea"
import EmotionSelectItem from "@/features/emotion/components/EmotionSelectItem"
import { EMOTION_ITEMS } from "@/features/emotion/constants"
import { EmotionItem } from "@/features/emotion/types/emotion"
import MapPinMarker from "@/features/map/components/MapPinMarker"
import useMap from "@/features/map/hooks/useMapCopy"
import { PostCreateResponse } from "../types/post"

type PostConfirmProps = {
  formData: PostCreateResponse
}

const PostConfirm = ({ formData }: PostConfirmProps) => {
  const { latitude: lat, longitude: lng, content, emotion } = formData

  useMap({ initLocation: { lat, lng } }) // 지도 컴포넌트

  return (
    <section className="flex flex-col w-full p-4">
      {/* 내가 있는 위치 확인 */}
      <EmSection>
        <EmSection.Header title="내가 있는 위치" />
        <div className="relative flex justify-start items-center w-full h-full">
          <div id="map" className="w-full h-full min-h-60"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 cursor-pointer border-neutral-200">
            <MapPinMarker />
          </div>
        </div>
      </EmSection>

      {/* 기존 EmotionSelector 컴포넌트 재사용 (readonly 모드) */}
      <EmSection className="h-full">
        <EmSection.Header title="선택 한 감정" />
        <div className="flex justify-start  items-center w-full">
          <EmotionSelectItem
            onSelect={() => {}}
            isSelected={false}
            emotion={EMOTION_ITEMS.find(({ id }) => id === emotion) as EmotionItem}
          />
        </div>
      </EmSection>

      {/* 작성한 내용 */}
      <EmSection className="h-full">
        <EmSection.Header title="작성한 내용" />
        <div className="flex justify-start  items-center w-full">
          <EmTextArea
            disabled
            textState={content}
            placeholder="내용을 입력해주세요"
            className="min-h-0"
          />
        </div>
      </EmSection>
    </section>
  )
}

export default PostConfirm
