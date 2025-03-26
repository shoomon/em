import { RefObject, useEffect, useRef } from "react"

interface useMapProps {
  initLocation: { lat: number; lng: number }
  mapRef: RefObject<HTMLDivElement | null>
}

const useMap = ({ initLocation, mapRef }: useMapProps) => {
  const map = useRef<naver.maps.Map>(null)

  useEffect(() => {
    if (!mapRef.current || map.current) {
      return
    }

    map.current = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(initLocation.lat, initLocation.lng),
      zoom: 16,
    })
  }, [mapRef.current])

  return { map }
}

export default useMap
