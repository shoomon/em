import { REACTION_ICON_MAPPER } from "@/features/emotion/constants"
import { formatNumber } from "@/utils/number"
import { motion } from "framer-motion"
import { ReactionType } from "../types/post"

import angerGif from "@/assets/emotions/anger.gif"
import anticipationGif from "@/assets/emotions/anticipation.gif"
import disgustGif from "@/assets/emotions/disgust.gif"
import fearGif from "@/assets/emotions/fear.gif"
import joyGif from "@/assets/emotions/joy.gif"
import neutralGif from "@/assets/emotions/neutral.gif"
import sadnessGif from "@/assets/emotions/sadness.gif"
import surpriseGif from "@/assets/emotions/surprise.gif"
import trustGif from "@/assets/emotions/trust.gif"

interface ReactionButtonProps {
  emotionName: ReactionType
  count: number
  isAnimating: boolean
  onClick: () => void
  onAnimationComplete: () => void
  className?: string
}

const ReactionButton = ({
  emotionName,
  count,
  isAnimating,
  onClick,
  onAnimationComplete,
  className,
}: ReactionButtonProps) => {
  const emotionGif = {
    anger: angerGif,
    anticipation: anticipationGif,
    disgust: disgustGif,
    fear: fearGif,
    joy: joyGif,
    neutral: neutralGif,
    sadness: sadnessGif,
    surprise: surpriseGif,
    trust: trustGif,
  }
  return (
    <button
      className={`flex flex-col items-center w-10 p-2 transition-transform duration-200 ease-in-out cursor-pointer hover:scale-110 ${className}`}
      onClick={onClick}>
      <div className="relative size-5">
        {isAnimating ? (
          <motion.img
            src={
              emotionGif[emotionName.toLowerCase() as keyof typeof emotionGif]
            }
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
