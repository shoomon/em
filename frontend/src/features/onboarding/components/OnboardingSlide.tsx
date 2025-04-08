import { motion } from "framer-motion"

interface OnboardingSlideProps {
  direction: number
  slide: {
    id: number
    video_url: string
    title: string
    subtitle: string
  }
  onDragEnd: (event: any, info: any) => void
}

const OnboardingSlide = ({
  direction,
  slide,
  onDragEnd,
}: OnboardingSlideProps) => {
  const isFirstSlide = slide.id === 0

  return (
    <>
      <motion.div
        key={slide.id + "-text"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xs text-left">
        <h2 className="text-2xl font-bold text-em-black">{slide.title}</h2>
        <p className="text-base text-em-black whitespace-pre-line">
          {slide.subtitle}
        </p>
      </motion.div>

      <motion.div
        key={slide.id}
        custom={direction}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragEnd}
        initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction < 0 ? 100 : -100 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col h-[55vh] items-center">
        <div className="w-full max-w-xs flex items-center justify-center">
          <div
            className={`flex rounded-lg overflow-hidden ${
              !isFirstSlide
                ? "border-2 border-em-gray p-1 bg-em-white"
                : "items-center justify-center"
            }`}>
            <video
              src={slide.video_url}
              autoPlay
              muted
              playsInline
              className="object-contain w-full max-h-[55vh] h-auto rounded-md items-center"
            />
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default OnboardingSlide
