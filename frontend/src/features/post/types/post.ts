import { LatLng } from "@/features/map/types/map"
import { FormEvent } from "react"

export type PostListType = "all" | "cluster" | "marker"
export type ReactionType = "joy" | "sadness" | "anger" | "surprise" | "trust"

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

export interface PostListRequest extends PointListRequest {
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
  isAuthor: boolean
  nickname: string
  imageUrl: string
  emotion: string
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
      sum: number
    }
  }
  address: string
  createdAt: string
}

export interface PostInfiniteData {
  data: Post[]
  meta: {
    lastId: number
    lastDist: number
    lastCnt: number
    hasNext: boolean
  }
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

export interface PostFormStateType {
  isFocus: boolean
  currentStep: PostCreateStep
  formData: PostCreateRequest
  isSubmitPending: boolean
}

export interface PostFormActionType {
  setIsFocus: (isFocus: boolean) => void
  updateStep: (step: PostCreateStep) => void
  handleMapChange: (map: LatLng, address: string) => void
  updateFormData: (key: keyof PostCreateRequest, value: any) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isFormDataValid: (step: PostCreateStep) => boolean | undefined
}
