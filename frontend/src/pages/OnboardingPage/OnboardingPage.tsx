import OnboardingIndicators from "@/features/onboarding/components/OnboardingIndicators"
import OnboardingSlide from "@/features/onboarding/components/OnboardingSlide"
import { slides } from "@/features/onboarding/constants/slides"
import {
  completeOnboarding,
  hasSeenOnboarding,
} from "@/features/onboarding/utils/onboarding"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const OnboardingPage = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (hasSeenOnboarding()) {
      window.location.href = "/login"
    }
  }, [])

  const paginate = (newDirection: number) => {
    const newIndex = index + newDirection
    if (newIndex < 0 || newIndex >= slides.length) return
    setDirection(newDirection)
    setIndex(newIndex)
  }

  const handlePrev = () => {
    if (index > 0) {
      paginate(-1)
    }
  }

  const handleNext = () => {
    if (index < slides.length - 2) {
      paginate(1)
    } else {
      completeOnboarding()
      window.location.href = "/login"
    }
  }

  const handleSkip = () => {
    completeOnboarding()
    window.location.href = "/login"
  }

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -100) paginate(1)
    else if (info.offset.x > 100) paginate(-1)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-em-white px-6 py-4 gap-4">
      {/* 슬라이드 영역 */}
      <div className="w-full max-w-screen-md flex flex-col space-y-6 items-center">
        <AnimatePresence
          mode="wait"
          custom={direction}
          onExitComplete={() => {
            if (index === slides.length - 1) {
              completeOnboarding()
              window.location.href = "/login"
            }
          }}>
          <OnboardingSlide
            key={slides[index].id}
            direction={direction}
            slide={slides[index]}
            onDragEnd={handleDragEnd}
          />
        </AnimatePresence>
      </div>

      {/* 인디케이터 */}
      <OnboardingIndicators
        total={slides.length - 1}
        current={Math.min(index, slides.length - 2)}
      />

      {/* 버튼 */}
      <div className="w-full max-w-md px-4">
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className={`bg-em-gray text-white rounded-full px-6 py-2 transition-opacity duration-300 ${index === 0 ? "cursor-default" : "hover:bg-em-black"}`}>
            이전
          </button>
          <button
            onClick={handleNext}
            className="bg-em-gray hover:bg-em-black text-white rounded-full px-6 py-2">
            {index === slides.length - 2 ? "시작" : "다음"}
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSkip}
            className="text-sm text-em-gray hover:underline flex items-center gap-1">
            건너뛰기 <span>&gt;&gt;</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
