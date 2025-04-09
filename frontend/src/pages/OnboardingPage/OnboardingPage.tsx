import EmButton from "@/components/EmButton/EmButton"
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
      window.location.href = "/main"
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
    if (index < slides.length - 1) {
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
        <AnimatePresence mode="wait" custom={direction}>
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
        total={slides.length}
        current={Math.min(index, slides.length - 1)}
      />

      {/* 버튼 */}
      <div className="w-full max-w-md px-4">
        <div className="flex justify-center gap-4 mb-4">
          <EmButton
            onClick={handlePrev}
            variant={index === 0 ? "disabled" : "default"}
            shape="default"
            size="sm"
            weight="semibold"
            className={index === 0 ? "cursor-default" : ""}>
            이전
          </EmButton>
          <EmButton
            onClick={handleNext}
            variant={index === slides.length - 1 ? "destructive" : "default"}
            shape="default"
            size="sm"
            weight="semibold">
            {index === slides.length - 1 ? "시작" : "다음"}
          </EmButton>
        </div>
        <div className="flex justify-end">
          <EmButton
            onClick={handleSkip}
            variant="ghost"
            size="sm"
            weight="normal"
            className="text-sm text-em-gray hover:underline flex items-center gap-1">
            건너뛰기 <span>&gt;&gt;</span>
          </EmButton>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
