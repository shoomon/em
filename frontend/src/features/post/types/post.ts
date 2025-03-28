import { LatLng } from "@/features/map/types/map"

export interface Point {
  id: number
  lng: number
  lat: number
}

export interface PointList {
  pointList: Point[]
}

export interface PointListRequest {
  lng: number
  lat: number
  rad?: number
}

export interface PostListRequest {
  lng: number
  lat: number
  rad?: number
  postId?: number
  dist?: number
  emoCnt?: number
  sort?: string
  minLng?: number
  minLat?: number
  maxLng?: number
  maxLat?: number
}

export interface Post {
  postId: number
  userId: number
  nickname: string
  imageUrl: string | null
  content: string
  lng: number
  lat: number
  emotionInfo: {
    selectedEmotion: string
    emotionCounts: {
      joy: number
      sadness: number
      anger: number
      surprise: number
      trust: number
    }
  }
  address: string
  createdAt: string
}

export interface PostInfiniteData {
  data: Post[]
  meta: { lastId: number; hasNext: boolean }
}

export enum PostCreateStep {
  Map = 1,
  Content = 2,
  Emotion = 3,
  Confirm = 4,
}

export interface PostCreateRequest {
  content: string
  latitude: LatLng["lat"]
  longitude: LatLng["lng"]
  emotion: string
  address: string
}

export type EmojiType = "joy" | "sadness" | "anger" | "surprise" | "trust"
