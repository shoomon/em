import { LatLng } from "@/features/map/types/map"

export const getLocationPermission = async () => {
  if (!navigator.geolocation) {
    console.error("Geolocation API가 지원되지 않습니다.")
    return
  }

  try {
    const permission = await navigator.permissions.query({
      name: "geolocation",
    })
    return permission.state
  } catch (error) {
    alert(`권한 확인 중 오류가 발생하였습니다.\n${error}`)
  }
}

export const getCurrentPosition = async () => {
  return new Promise<LatLng>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        resolve(newPosition)
      },
      (error) => {
        alert(`현재 위치를 가져올 수 없습니다.\n${error}`)
        reject(error)
      },
      {
        enableHighAccuracy: true,
      },
    )
  })
}
