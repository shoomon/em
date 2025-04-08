export interface Music {
  musicId: string | null
  artistName: string | null
  title: string | null
  albumImageUrl: string | null
  spotifyTrackUrl: string | null
}

export interface RecommendedMusic {
  title: string
  artistName: string
  spotifyTrackUrl: string
  albumImageUrl: string
  score: number
}

export interface RecommendedMusicList {
  recommendedMusicList: RecommendedMusic
}

export interface PlayListInfiniteData {
  musicList: Music[]
  meta: {
    lastMusicId: number
    lastMusicCount: number
    hasNext: boolean
  }
}
