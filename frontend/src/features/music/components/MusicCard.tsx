import { RecommendedMusic } from "../types/music"

interface MusicCardProps {
  music: RecommendedMusic
  className?: string

  onClick?: () => void
}

const MusicCard = ({ music, className, onClick }: MusicCardProps) => {
  const { albumImageUrl, artistName, title } = music

  return (
    <div
      className={`flex flex-col gap-1.5 shrink-0 cursor-pointer w-28 xs:w-32 ${className}`}
      onClick={onClick}>
      <div className="overflow-hidden rounded-lg size-full">
        <img
          src={albumImageUrl || ""}
          alt=""
          className="object-cover transition-transform duration-200 rounded-lg size-full hover:scale-105"
          draggable={false}
        />
      </div>

      <div>
        <p className="text-sm font-semibold break-all xs:text-base line-clamp-1">
          {title}
        </p>
        <p className="text-xs break-all xs:text-sm text-em-black/50 line-clamp-1">
          {artistName}
        </p>
      </div>
    </div>
  )
}

export default MusicCard
