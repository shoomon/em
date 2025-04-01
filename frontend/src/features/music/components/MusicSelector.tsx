import EmInput from "@/components/EmInput/EmInput"
import MusicItem from "@/features/music/components/MusicItem"
import MusicSkeleton from "@/features/music/components/MusicSkeleton"
import useMusicSearch from "@/features/music/hooks/useMusicSearch"
import { Music } from "@/features/music/types/music"
import { FormEvent, useRef } from "react"
import MusicEmpty from "./MusicEmpty"

const MusicSelector = () => {
  const { data, isPending, setKeyword } = useMusicSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
    <div className="flex flex-col gap-4 overflow-y-auto h-[75dvh] p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold sm:text-xl text-em-black">
          🎵 메시지에 음악 추가하기
        </h1>
        <p className="text-sm sm:text-base text-em-black/60">
          지금 떠오르는 음악이 있나요?
        </p>
      </div>

      <EmInput
        ref={inputRef}
        placeholder="곡 이름을 입력해 주세요."
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <div className="flex-1">
        {isPending ? (
          Array.from({ length: 6 }).map((_, index) => (
            <MusicSkeleton key={index} />
          ))
        ) : data && data.length > 0 ? (
          data.map((item: Music, index: number) => (
            <MusicItem key={index} {...item} />
          ))
        ) : (
          <MusicEmpty description="해당하는 음악이 없어요" />
        )}
      </div>
    </div>
  )
}

export default MusicSelector
