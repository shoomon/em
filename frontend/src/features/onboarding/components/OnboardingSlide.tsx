import { motion } from "framer-motion"

interface OnboardingSlideProps {
  id: number
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
  id,
  direction,
  slide,
  onDragEnd,
}: OnboardingSlideProps) => {
  const isFirstSlide = slide.id === 0
  // const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  // useEffect(() => {
  //   // 비디오 프리로딩
  //   if (!isFirstSlide) {
  //     const video = document.createElement("video")
  //     video.src = slide.video_url
  //     video.preload = "auto"
  //     video.onloadeddata = () => {
  //       setIsVideoLoaded(true)
  //     }
  //   }
  // }, [slide.video_url, isFirstSlide])

  return (
    <div className="w-full h-full flex flex-col gap-6 items-center">
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
        initial={{ opacity: 0, x: direction > 0 ? 10 : -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col h-[55vh] items-center"
        id={`video-${slide.id}`}>
        <div
          className={`flex rounded-lg overflow-hidden aspect-[9/18] h-full ${
            !isFirstSlide
              ? "border-2 border-em-gray p-1 bg-em-white"
              : "items-center justify-center"
          }`}>
          {id === 0 ? (
            <img
              src={slide.video_url}
              alt=""
              className="w-full h-full"
              loading="eager"
            />
          ) : (
            <video
              src={slide.video_url}
              autoPlay
              playsInline
              muted
              className={`object-contain rounded-md items-center w-full h-full opacity-100 transition-opacity duration-300`}
            />
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default OnboardingSlide
