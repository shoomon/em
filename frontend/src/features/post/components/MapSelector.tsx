import EmSection from "@/components/EmSection/EmSection"
import MapFixer from "@/features/map/components/MapFixer"
import MapPinMarker from "@/features/map/components/MapPinMarker"
import { LatLng } from "@/features/map/types/map"
import { useEffect, useState } from "react"

type MapSelectorProps = {
  onMapChange: (_map: LatLng) => void
}

const MapSelector = ({ onMapChange }: MapSelectorProps) => {
  // const { currentPosition } = useGps() // 현재 위치 조회
  const [mapCenter, setMapCenter] = useState<LatLng>({ lat: 37.501286, lng: 127.0396029 }) // 지도 중앙 위치
  const [address, setAddress] = useState("") // 주소

  // 주소 조회
  useEffect(() => {
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
  const handleDragEnd = (newCenter: LatLng) => {
    setMapCenter(newCenter)
    onMapChange(newCenter)
  }
  return (
    <EmSection>
      <EmSection.Header title="내가 있는 위치를 조정해주세요 👌" />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">현재 나의 위치</span>
        <span className="text-sm">{address}</span>
      </div>
      <div className="relative flex flex-col max-h-1/2 h-full w-full bg-em-gray">
        <MapFixer className="h-full w-full" onDragEnd={handleDragEnd} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 cursor-pointer border-neutral-200">
          <MapPinMarker />
        </div>
      </div>
    </EmSection>
  )
}
export default MapSelector
