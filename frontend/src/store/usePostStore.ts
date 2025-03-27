import { LatLng } from "@/features/map/types/map"
import { create } from "zustand"

interface PostStore {
  isDrawerOpen: boolean
  setIsDrawerOpen: (isDrawerOpen: boolean) => void

  clusterGrid: [LatLng, LatLng] | null
  setClusterGrid: (clusterGrid: [LatLng, LatLng] | null) => void
}

const usePostStore = create<PostStore>((set) => ({
  isDrawerOpen: false,
  setIsDrawerOpen: (isDrawerOpen: boolean) => set({ isDrawerOpen }),

  clusterGrid: null,
  setClusterGrid: (clusterGrid: [LatLng, LatLng] | null) =>
    set({ clusterGrid }),
}))

export default usePostStore
