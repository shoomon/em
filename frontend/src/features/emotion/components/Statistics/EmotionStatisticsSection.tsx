import EmSection from "@/components/EmSection/EmSection"
import { useMemo } from "react"
import EmotionStatistics from "./EmotionStatistics"

const EmotionStatisticsSection = () => {
  const dateRange = useMemo(() => {
    const date = new Date()

    const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    return `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
  }, [])

  return (
    <EmSection className="pt-0 h-full flex-1">
      <EmSection.Header
        title="📈 이 달의 통계"
        description="이 달의 감정 통계를 확인할 수 있습니다."
        headerRight={`🗓️ 기간 : ${dateRange}`}
      />

      <EmotionStatistics />
    </EmSection>
  )
}

export default EmotionStatisticsSection
