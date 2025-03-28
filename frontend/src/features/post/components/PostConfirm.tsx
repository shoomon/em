import EmSection from "@/components/EmSection/EmSection"
import EmTextArea from "@/components/EmTextArea/EmTextArea"
import EmotionSelectItem from "@/features/emotion/components/EmotionSelectItem"
import { EMOTION_ITEMS } from "@/features/emotion/constants"
import { EmotionItem } from "@/features/emotion/types/emotion"
import MapPinMarker from "@/features/map/components/MapPinMarker"
import useMap from "@/features/map/hooks/useMap"
import { PostCreateRequest } from "../types/post"

type PostConfirmProps = {
  formData: PostCreateRequest
}

const PostConfirm = ({ formData }: PostConfirmProps) => {
  const { latitude: lat, longitude: lng, content, emotion } = formData

  useMap({ initLocation: { lat, lng }, draggable: false, zoomable: false }) // 지도 컴포넌트

  return (
    <section className="flex flex-col w-full h-full">
      {/* 내가 있는 위치 확인 */}
      <EmSection>
        <EmSection.Header title="🚩 내가 있는 위치" />
        <div className="relative flex justify-start items-center w-full h-full rounded-xl shadow">
          <div id="map" className="w-full h-full min-h-60 rounded-xl"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 cursor-pointer border-neutral-200">
            <MapPinMarker />
          </div>
        </div>
      </EmSection>

      {/* 기존 EmotionSelector 컴포넌트 재사용 (readonly 모드) */}
      <EmSection className="h-full">
        <EmSection.Header title="✨ 나의 감정" />
        <div className="flex justify-start  items-center w-full">
          <EmotionSelectItem
            onSelect={() => {}}
            isSelected={false}
            emotion={
              EMOTION_ITEMS.find(
                ({ engName }) => engName === emotion,
              ) as EmotionItem
            }
          />
        </div>
      </EmSection>

      {/* 작성한 내용 */}
      <EmSection className="h-full">
        <EmSection.Header title="📝 나의 속 마음" />
        <div className="flex justify-start  items-center w-full">
          <EmTextArea
            disabled
            textState={content}
            placeholder="내용을 입력해주세요"
            className="min-h-0"
            isActiveCount={false}
          />
        </div>
      </EmSection>
    </section>
  )
}

export default PostConfirm
