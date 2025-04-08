import Button from "@/components/Button/Button"
import { memo } from "react"
import { EmotionItem } from "../types/emotion"

interface EmotionSelectItemProps {
  onSelect?: (emotionId: string) => void
  isSelected?: boolean
  emotion: EmotionItem
}

const EmotionSelectItem = ({
  onSelect,
  isSelected,
  emotion,
}: EmotionSelectItemProps) => {
  const { korName, color, id, engName, emojiGif_url } = emotion
  return (
    <Button
      type="button"
      key={id}
      onClick={() => onSelect?.(engName)}
      className={`rounded-lg p-4 w-full transition-all duration-200 flex flex-col items-center justify-center ${color} ${
        isSelected
          ? "ring-2 ring-em-black/50 ring-offset-2 scale-103 font-bold"
          : "hover:scale-103"
      }`}>
      <img src={emojiGif_url} alt={korName} className="w-10 h-10" />
      <span className={`font-medium ${isSelected ? "text-em-primary" : ""}`}>
        {korName}
      </span>
    </Button>
  )
}

export default memo(EmotionSelectItem)
