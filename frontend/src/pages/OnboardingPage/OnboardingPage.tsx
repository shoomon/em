import EmButton from "@/components/EmButton/EmButton"
import OnboardingIndicators from "@/features/onboarding/components/OnboardingIndicators"
import OnboardingSlide from "@/features/onboarding/components/OnboardingSlide"
import { slides } from "@/features/onboarding/constants/slides"
import { cn } from "@/utils/cn"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

const OnboardingPage = () => {
  const { isSuccess } = useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: () => {
      return axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
    },
    retry: false,
  })

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const navigate = useNavigate()

  if (isSuccess) {
    return <Navigate to="/main" replace />
  }

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
      navigate("/login", { replace: true, viewTransition: true })
    }
  }

  const handleSkip = () => {
    navigate("/login", { replace: true, viewTransition: true })
  }

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -100) paginate(1)
    else if (info.offset.x > 100) paginate(-1)
  }

  const isLastSlide = index < slides.length - 1

  return (
    <div className="min-h-dvh flex flex-col justify-center items-center bg-em-white px-6 py-4 gap-8">
      {/* 슬라이드 영역 */}
      <div className="w-full h-full flex flex-col items-center">
        {/* 왼쪽 화살표 */}
        {index > 0 && (
          <EmButton
            variant="ghost"
            onClick={handlePrev}
            className="absolute -left-1 top-1/2 transform -translate-y-1/2 p-2 text-2xl text-em-gray hover:text-black transition">
            <ChevronLeft className="size-10" />
          </EmButton>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          <OnboardingSlide
            key={slides[index].id}
            direction={direction}
            slide={slides[index]}
            onDragEnd={handleDragEnd}
          />
        </AnimatePresence>
        {/* 오른쪽 화살표 */}
        {index < slides.length - 1 && (
          <EmButton
            variant="ghost"
            onClick={handleNext}
            className="absolute -right-1 top-1/2 transform -translate-y-1/2 p-2 text-2xl text-em-gray hover:text-black transition">
            <ChevronRight className="size-10" />
          </EmButton>
        )}
      </div>

      {/* 인디케이터 */}
      <OnboardingIndicators
        total={slides.length}
        current={Math.min(index, slides.length - 1)}
      />

      {/* 버튼 */}
      <div className="w-full max-w-md px-4">
        <div className="flex justify-center">
          <EmButton
            onClick={isLastSlide ? handleSkip : handleNext}
            variant={isLastSlide ? "outline" : "default"}
            className={cn(
              "flex items-center justify-center gap-1 transition-all duration-300 w-full",
              !isLastSlide && "bg-em-black text-em-white",
            )}>
            {isLastSlide ? (
              <span>
                건너뛰기 <span>&gt;&gt;</span>
              </span>
            ) : (
              <span>시작하기</span>
            )}
          </EmButton>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
