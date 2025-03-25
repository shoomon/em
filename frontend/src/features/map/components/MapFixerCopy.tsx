import useMap from "@/features/map/hooks/useMapCopy"
import { useCallback, useEffect, useRef } from "react"
import { LatLng } from "../types/map"

interface MapFixerProps {
  className?: string
  onDragEnd?: (newCenter: LatLng) => void
  initLocation?: LatLng | null
}

const MapFixer = ({ className, onDragEnd, initLocation }: MapFixerProps) => {
  const { mapRef } = useMap({ initLocation }) // 지도 컴포넌트
  const rangeRef = useRef<naver.maps.Circle>(null) // 반경 영역

  const RADIUS = 100 // 반경 반지름

  const handleDragEnd = useCallback(() => {
    if (mapRef.current && initLocation) {
      const { lat, lng } = initLocation
      const projection = mapRef.current.getProjection() // 투영 객체
      const initCenter = new naver.maps.LatLng(lat, lng) // 초기 중앙 위치
      const newCenter = mapRef.current.getCenter() // 변경된 중앙 위치
      // 중앙 위치가 변경되었을 때 호출
      onDragEnd?.({ lat: newCenter.y, lng: newCenter.x })
      const distance = projection.getDistance(initCenter, newCenter)
      const color = distance > RADIUS ? "rgba(255, 0, 0, 0.1)" : "rgba(0, 255, 0, 0.1)"

      rangeRef.current?.setOptions({
        center: initCenter,
        fillColor: color,
        strokeColor: color,
        strokeWeight: 1,
      })
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

    window.naver.maps.Event.addListener(mapRef.current, "dragend", handleDragEnd)

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
