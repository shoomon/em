import { StepForward } from "lucide-react"

interface MusicPlayButtonProps {
  onClick?: () => void
}

const MusicPlayButton = ({ onClick }: MusicPlayButtonProps) => {
  return (
    <button className="cursor-pointer shrink-0" onClick={onClick}>
      <StepForward className="stroke-em-gray size-5" />
    </button>
  )
}

export default MusicPlayButton
