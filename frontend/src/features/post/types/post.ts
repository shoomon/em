import { LatLng } from "@/features/map/types/map"

export interface Post {
  id: number
  location: string
  lat: number
  lng: number
  date: string
  author: string
  content: string
  emoji: {
    happy: number
    sad: number
    love: number
    angry: number
    confident: number
  }
}

export enum PostCreateStep {
  Map = 1,
  Content = 2,
  Emotion = 3,
  Confirm = 4,
}

export type PostCreateResponse = {
  content: string
  latitude: LatLng["lat"]
  longitude: LatLng["lng"]
  emotion: string
}
