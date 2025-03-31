import EmSection from "@/components/EmSection/EmSection"
import EmotionStatistics from "./EmotionStatistics"

const EmotionStatisticsSection = () => {
  return (
    <EmSection className="pt-0 h-full flex-1">
      <EmSection.Header
        title="📈 이 달의 통계"
        description="이 달의 감정 통계를 확인할 수 있습니다."
      />
      <EmotionStatistics />
    </EmSection>
  )
}

export default EmotionStatisticsSection
