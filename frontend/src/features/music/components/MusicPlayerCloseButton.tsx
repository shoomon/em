import { XIcon } from "lucide-react"

interface MusicPlayerCloseButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const MusicPlayerCloseButton = ({ onClick }: MusicPlayerCloseButtonProps) => {
  return (
    <button className="cursor-pointer" onMouseDown={onClick}>
      <XIcon className="stroke-4 size-4 xs:size-5 stroke-em-white" />
    </button>
  )
}

export default MusicPlayerCloseButton
