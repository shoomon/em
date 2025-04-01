import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { fetchMusicSearch } from "../api/musicApi"

const useMusicSearch = () => {
  const [keyword, setKeyword] = useState("")
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => fetchMusicSearch(keyword),
    onSuccess: (data) => {
      queryClient.setQueryData(["music", keyword], data)
      queryClient.setQueryDefaults(["music", keyword], {
        staleTime: 1000 * 60 * 60 * 24,
      })
    },
  })

  return { keyword, setKeyword, mutation }
}

export default useMusicSearch
