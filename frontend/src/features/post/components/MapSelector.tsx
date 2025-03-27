import EmSection from "@/components/EmSection/EmSection"
import MapFixer from "@/features/map/components/MapFixerCopy"
import MapPinMarker from "@/features/map/components/MapPinMarker"
import { LatLng } from "@/features/map/types/map"
import { useEffect, useState } from "react"

type MapSelectorProps = {
  onMapChange: (_map: LatLng, _address: string) => void
  setIsButtonDisabled: (isDisabled: boolean) => void
}

const MapSelector = ({
  onMapChange,
  setIsButtonDisabled,
}: MapSelectorProps) => {
  const [initLocation, setInitLocation] = useState<LatLng | null>(null)
  // const [currentPosition, setCurrentPosition] = useState<LatLng | null>(null)
  const [mapCenter, setMapCenter] = useState<LatLng | null>(null) // 지도 중앙 위치
  const [address, setAddress] = useState("") // 주소
  // 현재 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      // 현재 위치 설정
      const { latitude: lat, longitude: lng } = coords
      // setCurrentPosition({ lat, lng })
      setInitLocation({ lat, lng })
      setMapCenter({ lat, lng })

      // 주소 조회
      naver.maps.Service.reverseGeocode(
        {
          coords: new naver.maps.LatLng(lat, lng),
        },
        (_, response: naver.maps.Service.ReverseGeocodeResponse) => {
          const address = response.v2.address.jibunAddress
          setAddress(address)
          onMapChange({ lat, lng }, address)
        },
      )
    })
  }, [])
  // 주소 조회
  useEffect(() => {
    if (!mapCenter) {
      return
    }

    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(mapCenter.lat, mapCenter.lng),
      },
      (_, response: naver.maps.Service.ReverseGeocodeResponse) => {
        setAddress(response.v2.address.jibunAddress)
      },
    )
  }, [mapCenter])

  // 지도 중앙 위치 변경 시 호출
  const handleDragEnd = (newCenter: LatLng, isOutOfRange: boolean) => {
    setMapCenter(newCenter)

    // 반경 영역을 벗어났는지 확인
    if (!isOutOfRange) {
      onMapChange(newCenter, address)
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }
  return (
    <div className="flex flex-col h-full gap-2">
      <EmSection>
        <EmSection.Header title="🚩내 위치를 조정해 주세요. " />
        <div className="flex flex-col gap-4 h-full ">
          {/* 현재 위치 정보 */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold">현재 나의 위치</span>
            <span>{address}</span>
          </div>
          {/* 지도 */}
          <div className="relative h-full w-full bg-em-gray-sm">
            <MapFixer
              className="h-full w-full"
              onDragEnd={handleDragEnd}
              initLocation={initLocation}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+12px)] p-2 cursor-pointer border-neutral-200">
              <MapPinMarker />
            </div>
          </div>
        </div>
      </EmSection>
    </div>
  )
}
export default MapSelector
