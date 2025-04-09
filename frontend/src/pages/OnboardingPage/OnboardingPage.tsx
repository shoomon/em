import EmButton from "@/components/EmButton/EmButton"
import OnboardingIndicators from "@/features/onboarding/components/OnboardingIndicators"
import OnboardingSlide from "@/features/onboarding/components/OnboardingSlide"
import { slides } from "@/features/onboarding/constants/slides"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Navigate } from "react-router-dom"

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
      window.location.href = "/login"
    }
  }

  const handleSkip = () => {
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
        {/* 왼쪽 화살표 */}
        {index > 0 && (
          <EmButton
            variant="ghost"
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 text-2xl text-em-gray hover:text-black transition">
            <ChevronLeft className="w-5 h-10" />
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
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-2xl text-em-gray hover:text-black transition">
            <ChevronRight className="w-5 h-10" />
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
        {/* <div className="flex justify-center gap-4 mb-4">
          <EmButton
            onClick={handlePrev}
            variant={index === 0 ? "disabled" : "outline"}
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
        </div> */}
        <div className="flex justify-center">
          {index < slides.length - 1 ? (
            <EmButton
              onClick={handleSkip}
              variant="ghost"
              size="sm"
              weight="normal"
              className="text-sm text-em-gray hover:underline flex items-center gap-1">
              건너뛰기 <span>&gt;&gt;</span>
            </EmButton>
          ) : (
            <EmButton
              onClick={handleNext}
              variant="default"
              size="sm"
              weight="normal"
              className="text-sm text-em-white flex items-center gap-1">
              시작하기
            </EmButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
