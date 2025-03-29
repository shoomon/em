import angryImage from "@/assets/angry.svg"
import confidentImage from "@/assets/confident.svg"
import happyImage from "@/assets/happy.svg"
import loveImage from "@/assets/love.svg"
import sadImage from "@/assets/sad.svg"
import { formatNumber } from "@/utils/number"
import { EmojiType } from "../types/post"

const emotionMapper = {
  joy: happyImage,
  sadness: sadImage,
  anger: angryImage,
  surprise: loveImage,
  trust: confidentImage,
}

interface EmojiButtonProps {
  emotionName: EmojiType
  count: number
  onClick: () => void
  className?: string
}

const EmojiButton = ({
  emotionName,
  count,
  onClick,
  className,
}: EmojiButtonProps) => {
  return (
    <button
      className={`flex flex-col items-center w-10 p-2 transition-transform duration-200 ease-in-out cursor-pointer hover:scale-110 ${className}`}
      onClick={onClick}>
      <img src={emotionMapper[emotionName]} alt="" className="size-5" />
      <p className="text-xs text-center">{formatNumber(count)}</p>
    </button>
  )
}

export default EmojiButton
