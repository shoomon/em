import { EmotionEngNameType } from "@/features/emotion/types/emotion"
import MusicItem from "@/features/music/components/MusicItem"
import { YoutubeDispatchContext } from "@/features/music/contexts/YoutubeContext"
import { Music } from "@/features/music/types/music"
import { StepForward } from "lucide-react"
import { useContext } from "react"

interface MusicChartListProps {
  category: EmotionEngNameType
  musicList: Music[]
}

const MusicChartList = ({ musicList }: MusicChartListProps) => {
  const setQuery = useContext(YoutubeDispatchContext)

  const handleClickItem = (music: Music) => {
    setQuery?.(music.artistName + " " + music.title + " topic")
  }

  return (
    <div className="flex flex-col flex-1 gap-3">
      {musicList.map((item, index) => (
        <div key={item.musicId} className="flex items-center flex-1 gap-4">
          <p className="w-5 font-semibold text-center">{index + 1}</p>

          <MusicItem music={item} className="flex-1 p-0">
            <button
              className="cursor-pointer shrink-0"
              onClick={() => handleClickItem(item)}>
              <StepForward className="stroke-em-gray size-5" />
            </button>
          </MusicItem>
        </div>
      ))}
    </div>
  )
}

export default MusicChartList
