export interface Music {
  musicId: number | null
  artistName: string | null
  title: string | null
  albumImageUrl: string | null
  spotifyTrackUrl: string | null
}

export interface PlayListInfiniteData {
  damusicListta: Music[]
  meta: {
    lastMusicId: number
    lastMusicCount: number
    hasNext: boolean
  }
}
