import EmSection from "@/components/EmSection/EmSection"
import EmTextArea from "@/components/EmTextArea/EmTextArea"
import EmotionSelectItem from "@/features/emotion/components/EmotionSelectItem"
import { EMOTION_ITEMS } from "@/features/emotion/constants"
import { EmotionItem } from "@/features/emotion/types/emotion"
import MapPinMarker from "@/features/map/components/MapPinMarker"
import useMap from "@/features/map/hooks/useMap"
import MusicItem from "@/features/music/components/MusicItem"
import { ListMusicIcon } from "lucide-react"
import { memo } from "react"
import { usePostFormState } from "../../contexts/PostFormContext"

type PostConfirmProps = {}

const PostConfirm = ({}: PostConfirmProps) => {
  const { formData } = usePostFormState()

  const { latitude: lat, longitude: lng, content, emotion } = formData

  useMap({
    initLocation: { lat, lng },
    config: {
      mapDiv: "map",
      mapOptions: {
        draggable: false,
        scrollWheel: false,
        disableDoubleTapZoom: true,
        disableDoubleClickZoom: true,
        disableTwoFingerTapZoom: true,
      },
    },
  }) // 지도 컴포넌트

  return (
    <section className="flex flex-col w-full h-full">
      {/* 내가 있는 위치 확인 */}
      <EmSection>
        <EmSection.Header title="🚩 나의 위치" />
        <div className="relative flex items-center justify-start w-full h-full shadow rounded-xl">
          <div id="map" className="w-full h-full min-h-60 rounded-xl"></div>

          <div className="absolute p-2 -translate-x-1/2 -translate-y-1/2 cursor-pointer top-1/2 left-1/2 border-neutral-200">
            <MapPinMarker />
          </div>
        </div>
      </EmSection>

      {/* 기존 EmotionSelector 컴포넌트 재사용 (readonly 모드) */}
      <EmSection className="h-full">
        <EmSection.Header title="😇 나의 감정" />
        <div className="flex items-center justify-start w-full">
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
        <EmSection.Header title="❤️ 나의 속마음" />
        <div className="flex flex-col items-center justify-start w-full gap-4">
          <div
            className={`flex items-center justify-center w-full h-20 gap-2 border rounded-lg border-em-gray-md ${formData.title ? "bg-em-white" : "bg-em-gray-sm/30  border-dashed"}`}>
            {formData.title ? (
              <MusicItem
                music={{
                  artistName: formData.artistName,
                  title: formData.title,
                  albumImageUrl: formData.albumImageUrl,
                  spotifyTrackUrl: formData.spotifyTrackUrl,
                  musicId: formData.musicId,
                }}
              />
            ) : (
              <>
                <ListMusicIcon className="stroke-em-black/30" />
                <p className="text-em-black/30">등록된 음악이 없어요</p>
              </>
            )}
          </div>

          <EmTextArea
            disabled
            textState={content}
            placeholder="입력된 내용이 없어요"
            className="placeholder-em-black/30"
            isActiveCount={false}
          />
        </div>
      </EmSection>
    </section>
  )
}

export default memo(PostConfirm)
