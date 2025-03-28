import { LatLng } from "@/features/map/types/map"
import { create } from "zustand"

type PostListType = "all" | "cluster" | "marker"

interface PostStore {
  type: PostListType
  setType: (type: PostListType) => void

  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void

  clusterGrid: [LatLng, LatLng]
  setClusterGrid: (clusterGrid: [LatLng, LatLng]) => void
}

const usePostStore = create<PostStore>((set) => ({
  type: "all",
  setType: (type) => set({ type }),

  isVisible: false,
  setIsVisible: (isVisible) => set({ isVisible }),

  clusterGrid: [
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0 },
  ],
  setClusterGrid: (clusterGrid: [LatLng, LatLng]) => set({ clusterGrid }),
}))

export default usePostStore
