import { Music2Icon, XIcon } from "lucide-react"
import React, { useRef } from "react"
import YouTube from "react-youtube"
import useMusicPlayerDrag from "../hooks/useMusicPlayerDrag"

interface MusicPlayerProps {
  videoId: string

  onClose?: () => void
}

const MusicPlayer = ({ videoId, onClose }: MusicPlayerProps) => {
  const playerRef = useRef<HTMLDivElement>(null)
  const position = useMusicPlayerDrag(playerRef)

  return (
    <div
      ref={playerRef}
      className="fixed top-0 left-0 shadow-xl cursor-move pointer-events-auto z-130 touch-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}>
      <div className="flex items-center justify-between px-3 py-1.5 bg-em-black rounded-t-md">
        <div className="flex items-center gap-1">
          <Music2Icon className="stroke-3 size-3 xs:size-4 stroke-em-white" />
          <p className="text-sm font-semibold xs:text-base text-em-white">
            이음 플레이어
          </p>
        </div>

        <button className="cursor-pointer" onMouseDown={onClose}>
          <XIcon className="stroke-4 size-4 xs:size-5 stroke-em-white" />
        </button>
      </div>

      <YouTube
        key={videoId} // videoId prop이 변경되는 것만으로는 내부의 <iframe>요소가 리렌더링되지 않기 때문에 key값을 부여하여 강제로 리렌더링
        className="w-52 xs:w-72 aspect-video"
        videoId={videoId}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            rel: 0,
            modestbranding: 1,
          },
        }}
        onEnd={(e) => {
          e.target.stopVideo(0)
        }}
      />
    </div>
  )
}

export default React.memo(MusicPlayer)
