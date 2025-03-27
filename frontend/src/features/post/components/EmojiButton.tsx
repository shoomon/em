import angryImage from "@/assets/angry.svg"
import confidentImage from "@/assets/confident.svg"
import happyImage from "@/assets/happy.svg"
import loveImage from "@/assets/love.svg"
import sadImage from "@/assets/sad.svg"
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
}

const EmojiButton = ({ emotionName, count, onClick }: EmojiButtonProps) => {
  return (
    <button
      className="flex flex-col items-center w-5 transition-transform duration-200 ease-in-out cursor-pointer hover:scale-110"
      onClick={onClick}>
      <img src={emotionMapper[emotionName]} alt="" className="size-full" />
      <p className="text-xs text-center">{count}</p>
    </button>
  )
}

export default EmojiButton
