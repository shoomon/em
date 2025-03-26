import { useEffect, useRef } from "react"
import { LatLng } from "../types/map"

interface useMapProps {
  initLocation?: LatLng | null
  draggable?: boolean
  zoomable?: boolean
}

const useMap = ({ initLocation, draggable = true, zoomable = true }: useMapProps) => {
  const mapRef = useRef<naver.maps.Map>(null)

  useEffect(() => {
    if (initLocation) {
      mapRef.current = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(initLocation.lat, initLocation.lng),
        zoom: 17,
        draggable,
        disableDoubleClickZoom: !zoomable,
        scrollWheel: zoomable,
      })
      return
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      // 지도 초기화
      mapRef.current = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(coords.latitude, coords.longitude),
        zoom: 17,
        draggable,
        disableDoubleClickZoom: !zoomable,
        scrollWheel: zoomable,
      })
    })
  }, [])

  return { mapRef }
}

export default useMap
