import { LatLng } from "@/features/map/types/map"
import { PostListType } from "@/features/post/types/post"
import { create } from "zustand"

interface PostStore {
  type: PostListType
  setType: (type: PostListType) => void

  postId: number
  setPostId: (postId: number) => void

  clusterGrid: [LatLng, LatLng]
  setClusterGrid: (clusterGrid: [LatLng, LatLng]) => void

  isDrawerOpen: boolean
  setIsDrawerOpen: (isDrawerOpen: boolean) => void
}

const usePostStore = create<PostStore>((set) => ({
  type: "all",
  setType: (type) => set({ type }),

  postId: 0,
  setPostId: (postId) => set({ postId }),

  clusterGrid: [
    { lat: 0, lng: 0 },
    { lat: 0, lng: 0 },
  ],
  setClusterGrid: (clusterGrid) => set({ clusterGrid }),

  isDrawerOpen: false,
  setIsDrawerOpen: (isDrawerOpen) => set({ isDrawerOpen }),
}))

export default usePostStore
