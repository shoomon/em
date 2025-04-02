import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { fetchMusicSearch } from "../api/musicApi"
import { Music } from "../types/music"

const useMusicSearch = () => {
  const [keyword, setKeyword] = useState("")
  const { data, isPending } = useQuery<Music[]>({
    queryKey: ["music", keyword],
    queryFn: () => fetchMusicSearch(keyword),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  })

  return { data, isPending, setKeyword }
}

export default useMusicSearch
