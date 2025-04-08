import EmSection from "@/components/EmSection/EmSection"
import EmotionStatisticsSection from "@/features/emotion/components/Statistics/EmotionStatisticsSection"

const EmotionReportPage = () => {
  return (
    <div>
      {/* <section className="p-4 flex flex-col gap-6 relative">
        <UserProfileCard />
      </section> */}
      <EmSection>
        <EmotionStatisticsSection />
      </EmSection>
    </div>
  )
}
export default EmotionReportPage
