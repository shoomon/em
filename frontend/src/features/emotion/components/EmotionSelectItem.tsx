import Button from "@/components/Button/Button"
import { EmotionItem } from "../types/emotion"

interface EmotionSelectItemProps {
  onSelect: (emotionId: string) => void
  isSelected: boolean
  emotion: EmotionItem
}

const EmotionSelectItem = ({
  onSelect,
  isSelected,
  emotion,
}: EmotionSelectItemProps) => {
  const { korName, emoji, color, id, engName } = emotion
  return (
    <Button
      type="button"
      key={id}
      onClick={() => onSelect(engName)}
      className={`rounded-lg p-4 w-full transition-all duration-200 flex flex-col items-center justify-center ${color} ${
        isSelected
          ? "ring-2 ring-em-black/40 ring-offset-2 scale-102 font-bold"
          : "hover:scale-102"
      }`}>
      <span className="text-3xl mb-2">{emoji}</span>
      <span className={`font-medium ${isSelected ? "text-em-primary" : ""}`}>
        {korName}
      </span>
    </Button>
  )
}

export default EmotionSelectItem
