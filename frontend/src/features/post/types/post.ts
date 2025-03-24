export interface PostRequest {
  userId: number
  content: string
  latitude: number
  longitude: number
  emotion: string
}

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
