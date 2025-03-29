import { useEffect, useRef } from "react"
import { LatLng, NaverMapConstructorParam } from "../types/map"

interface useMapProps {
  initLocation?: LatLng | null
  config: NaverMapConstructorParam
}

const useMap = ({ initLocation, config }: useMapProps) => {
  const mapRef = useRef<naver.maps.Map>(null)

  useEffect(() => {
    if (mapRef.current) {
      return
    }

    if (initLocation) {
      mapRef.current = new window.naver.maps.Map(config.mapDiv, {
        center: new window.naver.maps.LatLng(
          initLocation.lat,
          initLocation.lng,
        ),
        ...config,
      })
      return
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      mapRef.current = new window.naver.maps.Map(config.mapDiv, {
        center: new window.naver.maps.LatLng(coords.latitude, coords.longitude),
        ...config,
      })
    })
  }, [])

  return { mapRef }
}

export default useMap
