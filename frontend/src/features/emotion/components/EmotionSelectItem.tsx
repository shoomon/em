import Button from "@/components/Button/Button"
import { EmotionItem } from "../types/emotion"

interface EmotionSelectItemProps {
  onSelect: (emotionId: string) => void
  isSelected: boolean
  emotion: EmotionItem
}

const EmotionSelectItem = ({ onSelect, isSelected, emotion }: EmotionSelectItemProps) => {
  const { name, emoji, color, id } = emotion
  return (
    <Button
      type="button"
      key={emotion.id}
      onClick={() => onSelect(id)}
      className={`rounded-lg p-4 w-full transition-all duration-200 flex flex-col items-center justify-center ${color} ${
        isSelected ? "ring-2 ring-em-black ring-offset-2 scale-105 font-bold" : "hover:scale-102"
      }`}>
      <span className="text-3xl mb-2">{emoji}</span>
      <span className={`font-medium ${isSelected ? "text-em-primary" : ""}`}>{name}</span>
    </Button>
  )
}
export default EmotionSelectItem
