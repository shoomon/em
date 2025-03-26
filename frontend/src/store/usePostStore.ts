import { LatLng } from "@/features/map/types/map"
import { create } from "zustand"

interface PostStore {
  postsType: "normal" | "clustered"
  setPostsType: (postType: "normal" | "clustered") => void

  grid: [LatLng, LatLng]
  setGrid: (grid: [LatLng, LatLng]) => void
}

const usePostStore = create<PostStore>((set) => ({
  postsType: "normal",
  setPostsType: (postsType) => set({ postsType }),

  grid: [
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0 },
  ],
  setGrid: (grid: [LatLng, LatLng]) => set({ grid }),
}))

export default usePostStore
