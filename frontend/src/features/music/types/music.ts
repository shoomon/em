export interface Music {
  artistName: string | null
  title: string | null
  albumImageUrl: string | null
  spotifyAlbumUrl: string | null
}

export interface PlayListInfiniteData {
  damusicListta: Music[]
  lastCursor: {
    lastMusicId: number
    lastMusicCount: number
    hasNext: boolean
  }
}
