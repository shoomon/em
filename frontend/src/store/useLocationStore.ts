import { LatLng } from "@/features/map/types/map"
import { getCurrentPosition, getLocationPermission } from "@/utils/location"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface LocationStore {
  isPermissionDenied: boolean
  checkPermission: () => Promise<void>

  currentLocation: LatLng
  setCurrentLocation: (currentLocation: LatLng) => void

  lastFetchedLocation: LatLng
  setLastFetchedLocation: (lastFetchedLocation: LatLng) => void
}

const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      isPermissionDenied: true,
      checkPermission: async () => {
        const pemissionState = await getLocationPermission()
        if (!pemissionState || pemissionState === "denied") {
          alert("서비스 이용을 위해 위치 권한을 허용해주세요.")
        } else {
          const location = await getCurrentPosition()
          set({
            isPermissionDenied: false,
            currentLocation: location,
            lastFetchedLocation: location,
          })
        }
      },

      currentLocation: { lat: 37.501286, lng: 127.0396029 },
      setCurrentLocation: (currentLocation) => set({ currentLocation }),

      lastFetchedLocation: { lat: 37.501286, lng: 127.0396029 },
      setLastFetchedLocation: (lastFetchedLocation) =>
        set({ lastFetchedLocation }),
    }),
    {
      name: "em-location",

      // 세션 스토리지에 저장
      storage: createJSONStorage(() => sessionStorage),

      // 권한 정보만 저장
      partialize: (state) => ({ isPermissionDenied: state.isPermissionDenied }),
    },
  ),
)

export default useLocationStore
