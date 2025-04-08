import EmInput from "@/components/EmInput/EmInput"
import MusicItem from "@/features/music/components/MusicItem"
import MusicSkeleton from "@/features/music/components/MusicSkeleton"
import useMusicSearch from "@/features/music/hooks/useMusicSearch"
import { Music } from "@/features/music/types/music"
import { FormEvent, useContext, useRef } from "react"
import { YoutubeDispatchContext } from "../contexts/YoutubeContext"
import MusicEmpty from "./MusicEmpty"
import MusicPlayButton from "./MusicPlayButton"

interface MusicSelectorProps {
  onSelect: (music: Music) => void
}

const MusicSelector = ({ onSelect }: MusicSelectorProps) => {
  const { data, isPending, setKeyword } = useMusicSearch()
  const inputRef = useRef<HTMLInputElement>(null)
  const setQuery = useContext(YoutubeDispatchContext)

  const handleClickItem = (music: Music) => {
    setQuery?.(music.artistName + " " + music.title + " topic")
  }

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (inputRef.current) {
      setKeyword(inputRef.current.value)
      inputRef.current.blur()
    }
  }
  const handleReset = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col gap-3 h-[75dvh] p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold xs:text-xl text-em-black">
            🎵 게시글에 음악 추가하기
          </h1>
          <p className="text-sm xs:text-base text-em-black/60">
            지금 떠오르는 음악이 있나요?
          </p>
        </div>

        <EmInput
          ref={inputRef}
          placeholder="곡 이름을 입력해 주세요"
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {isPending ? (
          Array.from({ length: 6 }).map((_, index) => (
            <MusicSkeleton key={index} />
          ))
        ) : data && data.length > 0 ? (
          data.map((item: Music, index: number) => (
            <MusicItem
              key={index}
              music={item}
              className="border-b border-b-em-gray-md"
              onClick={() => onSelect(item)}>
              <MusicPlayButton
                onClick={(e) => {
                  e.stopPropagation()
                  handleClickItem(item)
                }}
              />
            </MusicItem>
          ))
        ) : (
          <MusicEmpty description="해당하는 음악이 없어요" />
        )}
      </div>
    </div>
  )
}

export default MusicSelector
