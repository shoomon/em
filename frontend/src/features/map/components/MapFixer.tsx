import useMap from "@/features/map/hooks/useMap"
import { useCallback, useEffect, useRef } from "react"
import { LatLng } from "../types/map"

interface MapFixerProps {
  className?: string
  onDragEnd?: (newCenter: LatLng, isOutOfRange: boolean) => void
  initLocation?: LatLng | null
}

const MapFixer = ({ className, onDragEnd, initLocation }: MapFixerProps) => {
  const { mapRef } = useMap({
    initLocation,
    config: {
      mapDiv: "map",
      mapOptions: {
        zoom: 17,
        minZoom: 17,
      },
    },
  }) // 지도 컴포넌트
  const rangeRef = useRef<naver.maps.Circle>(null) // 반경 영역

  const RADIUS = 100 // 반경 반지름

  const updateRangeColor = (isOutOfRange: boolean) => {
    // 색상 설정을 더 명확하게
    const fillColor = isOutOfRange
      ? "rgba(255, 0, 0, 0.2)"
      : "rgba(0, 255, 0, 0.2)"

    // Circle 업데이트
    if (rangeRef.current) {
      rangeRef.current.setMap(null) // 기존 영역 제거

      // 영역을 벗어났을 때 시각적 피드백
      if (isOutOfRange) {
        // 잠시 더 진한 색상으로 표시했다가 원래 색상으로 돌아가기
        setTimeout(() => {
          rangeRef.current?.setOptions({
            center: initLocation as LatLng,
            fillColor,
            radius: RADIUS,
          })
        }, 200)
      }

      rangeRef.current.setMap(mapRef.current)
    }
  }

  const handleDragEnd = useCallback(() => {
    if (mapRef.current && initLocation) {
      const { lat, lng } = initLocation
      const projection = mapRef.current.getProjection()
      const initCenter = new naver.maps.LatLng(lat, lng)
      const newCenter = mapRef.current.getCenter()

      // 반경 영역 설정
      const distance = projection.getDistance(initCenter, newCenter)
      const isOutOfRange = distance > RADIUS

      // 중앙 위치가 변경되었을 때 호출
      onDragEnd?.({ lat: newCenter.y, lng: newCenter.x }, isOutOfRange)
      updateRangeColor(isOutOfRange)
    }
  }, [initLocation, onDragEnd])

  useEffect(() => {
    if (!mapRef.current || !initLocation) {
      return
    }

    rangeRef.current = new naver.maps.Circle({
      map: mapRef.current,
      center: new naver.maps.LatLng(initLocation.lat, initLocation.lng),
      radius: RADIUS,
      fillColor: "rgba(0, 255, 0, 0.1)",
      strokeColor: "rgba(0, 255, 0, 0.1)",
      strokeWeight: 1,
    })

    window.naver.maps.Event.addListener(mapRef.current, "idle", handleDragEnd)

    return () => {
      if (mapRef.current) {
        window.naver.maps.Event.clearInstanceListeners(mapRef.current)
      }

      if (rangeRef.current) {
        rangeRef.current.setMap(null)
      }
    }
  }, [initLocation, handleDragEnd])

  return <div id="map" className={className} />
}

export default MapFixer
