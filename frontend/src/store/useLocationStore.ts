import { LatLng } from "@/features/map/types/map"
import { create } from "zustand"

interface LocationStore {
  currentLocation: LatLng
  setCurrentLocation: (currentLocation: LatLng) => void

  lastFetchedLocation: LatLng
  setLastFetchedLocation: (lastFetchedLocation: LatLng) => void
}

const useLocationStore = create<LocationStore>((set) => ({
  currentLocation: { lat: 37.501286, lng: 127.0396029 },
  setCurrentLocation: (currentLocation) => set({ currentLocation }),

  lastFetchedLocation: { lat: 37.501286, lng: 127.0396029 },
  setLastFetchedLocation: (lastFetchedLocation) => set({ lastFetchedLocation }),
}))

export default useLocationStore
