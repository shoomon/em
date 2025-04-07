export interface Music {
  musicId: string | null
  artistName: string | null
  title: string | null
  albumImageUrl: string | null
  spotifyTrackUrl: string | null
}

export interface PlayListInfiniteData {
  musicList: Music[]
  meta: {
    lastMusicId: number
    lastMusicCount: number
    hasNext: boolean
  }
}
