import bearImage from "@/assets/dj_bear.png"
import speechBubbleImage from "@/assets/speech_bubble.png"
import { motion } from "framer-motion"

interface RecommendIntroAnimation {
  onComplete: () => void
}

const RecommendIntroAnimation = ({ onComplete }: RecommendIntroAnimation) => {
  return (
    <div className="fixed bottom-[calc(var(--navigation-bar-height))] z-50 w-full mx-auto max-w-150">
      <div className="relative">
        <motion.div
          animate={{
            x: [0, -30, -30, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            delay: 0.25,
            duration: 2.5,
            times: [0, 0.25, 0.75, 1],
          }}
          onAnimationComplete={onComplete}
          className="absolute bottom-0 right-0 flex flex-col w-56 origin-bottom-right scale-85 xs:scale-100">
          <div className="relative size-fit">
            <img
              src={speechBubbleImage}
              alt=""
              className="object-cover w-40"
              draggable={false}
            />

            <p className="absolute font-semibold select-none left-1/6 top-1/6">
              너를 위한
              <br />
              노래를 준비했어
            </p>
          </div>

          <img
            src={bearImage}
            alt=""
            className="self-end object-cover w-40"
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default RecommendIntroAnimation
