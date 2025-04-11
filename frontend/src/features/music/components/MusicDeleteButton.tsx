import { CircleXIcon } from "lucide-react"

interface MusicDeleteButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const MusicDeleteButton = ({ onClick }: MusicDeleteButtonProps) => {
  return (
    <button type="button" className="cursor-pointer" onClick={onClick}>
      <CircleXIcon className="size-5 fill-em-gray stroke-em-gray-sm" />
    </button>
  )
}

export default MusicDeleteButton
