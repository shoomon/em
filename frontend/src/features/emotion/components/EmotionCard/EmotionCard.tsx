import { cn } from "@/utils/cn"
import { motion } from "framer-motion"
import { EMOTION_TEXT_COLOR_MAPPER } from "../../constants"
import { EmotionItem } from "../../types/emotion"

interface EmotionCardProps {
  emotion: EmotionItem
  percentage: string
}

const EmotionCard = ({ emotion, percentage }: EmotionCardProps) => {
  const { korName, color, id, engName, emojiGif_url } = emotion
  return (
    <motion.div
      key={id}
      className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-2"
      whileHover={{ y: -3 }}>
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center ",
          color.split(" ")[0],
        )}>
        <img src={emojiGif_url} alt={korName} className="w-10 h-10" />
      </div>
      <div>
        <p className={`font-medium ${EMOTION_TEXT_COLOR_MAPPER[engName]}`}>
          {korName}
        </p>
        <p className="text-sm text-gray-500">{percentage}</p>
      </div>
    </motion.div>
  )
}
export default EmotionCard
