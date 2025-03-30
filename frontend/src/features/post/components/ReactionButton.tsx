import { REACTION_ICON_MAPPER } from "@/features/emotion/constants"
import { formatNumber } from "@/utils/number"
import { motion } from "framer-motion"
import { ReactionType } from "../types/post"

interface ReactionButtonProps {
  emotionName: ReactionType
  count: number
  isClicked: boolean
  onClick: () => void
  onAnimationComplete: () => void
  className?: string
}

const ReactionButton = ({
  emotionName,
  count,
  isClicked,
  onClick,
  onAnimationComplete,
  className,
}: ReactionButtonProps) => {
  return (
    <button
      className={`flex flex-col items-center w-10 p-2 transition-transform duration-200 ease-in-out cursor-pointer hover:scale-110 ${className}`}
      onClick={onClick}>
      <div className="relative size-5">
        {isClicked ? (
          <motion.img
            src={`/images/emotions/${emotionName}.gif`}
            className="absolute inset-0"
            animate={{ scale: [1.0, 1.4, 1.0] }}
            transition={{ duration: 2.0, ease: "easeOut" }}
            onAnimationComplete={onAnimationComplete}
          />
        ) : (
          <img
            src={REACTION_ICON_MAPPER[emotionName]}
            alt=""
            className="size-full"
          />
        )}
      </div>

      <p className="text-xs text-center">{formatNumber(count)}</p>
    </button>
  )
}

export default ReactionButton
