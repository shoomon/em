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

export interface PostCreateRequest {
  userId: number
  content: string
  lng: number
  lat: number
  emotion: string
}

export interface PostListRequest {
  lng: number
  lat: number
  rad?: number
  postId?: number
  dist?: number
  emoCnt?: number
  sort?: string
}

export interface ClusteredPostListRequest {
  minLng: number
  minLat: number
  maxLng: number
  maxLat: number
  postId?: number
  dist?: number
  emoCnt?: number
  sort?: string
}

export interface Post {
  id: number
  userId: number
  nickname: string
  imageUrl: string | null
  content: string
  lng: number
  lat: number
  emotionCountList: {
    joy: number
    sadness: number
    anger: number
    surprise: number
    trust: number
  }
  address: string
  createdAt: string
}

export interface PostInfiniteData {
  data: Post[]
  meta: { lastId: number; hasNext: boolean }
}
