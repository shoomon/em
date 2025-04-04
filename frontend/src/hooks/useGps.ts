import { getDistance } from "@/utils/math"
import { useEffect, useRef, useState } from "react"
import { LatLng } from "./../features/map/types/map"

const useGps = () => {
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] =
    useState(false)
  const [isStoppedWatching, setIsStoppedWatching] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<LatLng>({
    lat: 37.501286,
    lng: 127.0396029,
  })
  const [lastFetchedLocation, setLastFetchedLocation] = useState<LatLng>({
    lat: 37.501286,
    lng: 127.0396029,
  })
  const currentLocationRef = useRef(currentLocation) // setState와 watchPosition 모두 비동기로 동작하기 때문에 필요!
  const watchId = useRef<number | null>(null)

  const watchPosition = () => {
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
        // 50m 단위로 마지막 API 호출 위치를 갱신 => 주소 및 게시글 조회에 사용
        if (distance >= 50) {
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
  }

  const clearWatch = () => {
    if (!watchId.current) {
      return
    }

    navigator.geolocation.clearWatch(watchId.current)
    watchId.current = null
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (loc) => {
        const newLocation = {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
        }

        setIsLocationPermissionGranted(true)
        setCurrentLocation(newLocation)
        setLastFetchedLocation(newLocation)
        currentLocationRef.current = newLocation

        clearWatch()
        watchPosition()
      },
      () => {
        alert("위치 서비스 이용을 위해 위치 권한을 허용해 주세요")
        setIsLocationPermissionGranted(false)
      },
      {
        enableHighAccuracy: true,
      },
    )

    return () => {
      clearWatch()
    }
  }, [])

  useEffect(() => {
    if (isStoppedWatching) {
      clearWatch()
    } else if (isLocationPermissionGranted && !watchId.current) {
      watchPosition()
    }
  }, [isStoppedWatching])

  return {
    isLocationPermissionGranted,
    setIsStoppedWatching,
    currentLocation,
    lastFetchedLocation,
  }
}

export default useGps
