import { StepForward } from "lucide-react"
import { Music } from "../types/music"

const MusicItem = ({ albumImageUrl, title, artistName }: Music) => {
  return (
    <div className="flex items-center gap-2 p-3 border-b border-b-em-gray-md">
      <img
        src={
          albumImageUrl ||
          "https://i.maniadb.com/images/album/747/747251_1_f.jpg"
        }
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

        <StepForward className="cursor-pointer shrink-0 stroke-em-gray size-5" />
      </div>
    </div>
  )
}

export default MusicItem
