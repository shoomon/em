import { cn } from "@/utils/cn"
import { motion } from "framer-motion"
import { EMOTION_TEXT_COLOR_MAPPER } from "../../constants"
import { EmotionItem } from "../../types/emotion"

interface EmotionCardProps {
  emotion: EmotionItem
  count: number
  isMostEmotion?: boolean
}

const EmotionCard = ({ emotion, count, isMostEmotion }: EmotionCardProps) => {
  const { korName, color, id, engName, emojiGif_url } = emotion
  return (
    <motion.div
      key={id}
      className={cn(
        " ring-em-black/30 bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-2",
        isMostEmotion && "ring-1 ring-em-black/30",
      )}
      whileHover={{ y: -3 }}>
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center ",
          color.split(" ")[0],
        )}>
        <img src={emojiGif_url} alt={korName} className="w-10 h-10" />
      </div>
      <div className="flex-1 flex gap-2 items-center justify-between">
        <p className={`font-medium ${EMOTION_TEXT_COLOR_MAPPER[engName]}`}>
          {korName}
        </p>
        {/* <p className="text-sm text-gray-500">{percentage}</p> */}
        <p className="text-sm text-gray-500">{count}건</p>
      </div>
    </motion.div>
  )
}
export default EmotionCard
