import EmLoading from "@/components/EmLoading/EmLoading"
import EmSection from "@/components/EmSection/EmSection"
import { Suspense, useReducer } from "react"
import EmotionStatistics from "./EmotionStatistics"
import MonthNavigator from "./MonthNavigator"

const reducer = (state: Date, action: { type: "increase" | "decrease" }) => {
  const newDate = new Date()
  switch (action.type) {
    case "increase":
      newDate.setFullYear(state.getFullYear())
      newDate.setMonth(state.getMonth() + 1)
      return newDate
    case "decrease":
      newDate.setFullYear(state.getFullYear())
      newDate.setMonth(state.getMonth() - 1)
      return newDate
  }
}

const EmotionStatisticsSection = () => {
  const [date, dispatch] = useReducer(reducer, new Date())

  return (
    <EmSection className="pt-0 px-0 h-full flex-1">
      <EmSection.Header
        title="🌟 나의 감정 리포트"
        description="이 달의 감정 통계를 확인할 수 있습니다."
      />

      <MonthNavigator onDateChange={dispatch} date={date} />

      <Suspense fallback={<EmLoading />}>
        <EmotionStatistics date={date} />
      </Suspense>
    </EmSection>
  )
}

export default EmotionStatisticsSection
