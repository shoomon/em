import happyImage from "@/assets/happy.svg"
import sadImage from "@/assets/sad.svg"
import loveImage from "@/assets/love.svg"
import angryImage from "@/assets/angry.svg"
import confidentImage from "@/assets/confident.svg"

const emotionMapper = {
  joy: happyImage,
  sadness: sadImage,
  anger: angryImage,
  surprise: loveImage,
  trust: confidentImage,
}

interface EmojiButtonProps {
  emotionName: "joy" | "sadness" | "anger" | "surprise" | "trust"
  count: number
}

const EmojiButton = ({ emotionName, count }: EmojiButtonProps) => {
  return (
    <button className="flex flex-col items-center w-5 transition-transform duration-200 ease-in-out cursor-pointer hover:scale-110">
      <img src={emotionMapper[emotionName]} alt="" className="size-full" />
      <p className="text-xs text-center">{count}</p>
    </button>
  )
}

export default EmojiButton
