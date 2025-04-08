import { cn } from "@/utils/cn"
import { ReactNode } from "react"
import { Music } from "../types/music"

interface MusicItemProps {
  music: Music
  className?: string
  children?: ReactNode

  onClick?: () => void
}

const MusicItem = ({ music, className, children, onClick }: MusicItemProps) => {
  const { artistName, title, albumImageUrl } = music

  return (
    <div
      className={cn(`flex items-center w-full gap-2 p-3 ${className}`)}
      onClick={onClick}>
      <img
        src={albumImageUrl || ""}
        alt=""
        className="object-cover rounded-lg size-12"
        draggable={false}
      />

      <div className="flex items-center justify-between flex-1 gap-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold break-all line-clamp-1">{title}</p>
          <p className="text-xs break-all opacity-60 line-clamp-1">
            {artistName}
          </p>
        </div>

        {children}
      </div>
    </div>
  )
}

export default MusicItem
