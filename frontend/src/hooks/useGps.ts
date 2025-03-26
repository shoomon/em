import useLocationStore from "@/store/useLocationStore"
import { getDistance } from "@/utils/math"
import { useEffect, useRef } from "react"

const useGps = () => {
  const watchId = useRef<number | null>(null)
  const {
    currentLocation,
    setCurrentLocation,
    lastFetchedLocation,
    setLastFetchedLocation,
  } = useLocationStore()
  const currentLocationRef = useRef(currentLocation)

  useEffect(() => {
    watchId.current = navigator.geolocation.watchPosition(
      (loc) => {
        const newLocation = {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
        }
        let distance = getDistance(
          currentLocationRef.current.lat,
          currentLocationRef.current.lng,
          newLocation.lat,
          newLocation.lng,
        )

        // 1m 단위로 현재 위치를 갱신 => 마커에 반영
        if (distance < 1) {
          return
        }

        currentLocationRef.current = newLocation
        setCurrentLocation(newLocation)

        distance = getDistance(
          lastFetchedLocation.lat,
          lastFetchedLocation.lng,
          newLocation.lat,
          newLocation.lng,
        )
        // 20m 단위로 마지막 API 호출 위치를 갱신 => 주소 및 게시글 조회에 사용
        if (distance >= 20) {
          setLastFetchedLocation(newLocation)
        }
      },
      (error) => {
        console.error("위치 감지 실패:", error)
      },
      {
        enableHighAccuracy: true,
      },
    )

    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current)
      }
    }
  }, [])

  return {
    currentLocation,
    lastFetchedLocation,
  }
}

export default useGps
