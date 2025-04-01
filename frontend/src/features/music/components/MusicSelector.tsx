import EmInput from "@/components/EmInput/EmInput"
import { useQueryClient } from "@tanstack/react-query"
import { FormEvent } from "react"
import useMusicSearch from "../hooks/useMusicSearch"
import PlayListItem from "./PlayListItem"

const MusicSelector = () => {
  const { keyword, setKeyword, mutation } = useMusicSearch()
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<(typeof PlayListItem)[]>([
    "music",
    keyword,
  ])

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!data) {
      mutation.mutate()
    }
  }

  console.log(data)

  return (
    <div className="overflow-y-auto h-[75dvh] px-4">
      <EmInput
        keyword={keyword}
        onChange={setKeyword}
        onSearch={handleSearch}
        placeholder="곡 이름을 입력해 주세요."
      />

      {data?.map((item, index) => (
        <PlayListItem
          key={index}
          albumImageUrl={item.albumImageUrl}
          title={item.title}
          artistName={item.artistName}
        />
      ))}
    </div>
  )
}

export default MusicSelector
