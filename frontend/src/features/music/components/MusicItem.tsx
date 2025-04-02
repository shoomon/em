import { StepForward } from "lucide-react"
import { Music } from "../types/music"

interface MusicItemProps {
  music: Music
  readOnly?: boolean

  onClick?: (music: Music) => void
}

const MusicItem = ({ music, readOnly = false, onClick }: MusicItemProps) => {
  const { artistName, title, albumImageUrl } = music

  const handleClick = () => {
    onClick?.(music)
  }

  return (
    <div
      className={`flex items-center w-full gap-2 p-3 ${!readOnly ? "border-b border-b-em-gray-md" : ""}`}
      onClick={handleClick}>
      <img
        src={albumImageUrl || ""}
        alt=""
        className="object-cover rounded-lg size-12"
      />

      <div className="flex items-center justify-between flex-1 gap-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold break-all line-clamp-1">{title}</p>
          <p className="text-xs break-all opacity-60 line-clamp-1">
            {artistName}
          </p>
        </div>

        {!readOnly && (
          <StepForward className="cursor-pointer shrink-0 stroke-em-gray size-5" />
        )}
      </div>
    </div>
  )
}

export default MusicItem
