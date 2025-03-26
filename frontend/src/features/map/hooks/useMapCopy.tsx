import { useEffect, useRef } from "react"
import { LatLng } from "../types/map"

interface useMapProps {
  initLocation?: LatLng | null
}

const useMap = ({ initLocation }: useMapProps) => {
  const mapRef = useRef<naver.maps.Map>(null)
  console.log(initLocation, "initLocation")

  useEffect(() => {
    if (initLocation) {
      mapRef.current = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(initLocation.lat, initLocation.lng),
        zoom: 17,
      })
      return
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      // 지도 초기화
      mapRef.current = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(coords.latitude, coords.longitude),
        zoom: 17,
      })
    })
  }, [])

  return { mapRef }
}

export default useMap
