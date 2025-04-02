import EmLoading from "@/components/EmLoading/EmLoading"
import EmSection from "@/components/EmSection/EmSection"
import EmotionStatisticsSection from "@/features/emotion/components/Statistics/EmotionStatisticsSection"
import { Suspense } from "react"

interface EmotionReportPageProps {}

const EmotionReportPage = ({}: EmotionReportPageProps) => {
  return (
    <div>
      {/* <section className="p-4 flex flex-col gap-6 relative">
        <UserProfileCard />
      </section> */}
      <EmSection>
        <EmSection.Header title="🌟 나의 감정 리포트" />
        <Suspense fallback={<EmLoading />}>
          <EmotionStatisticsSection />
        </Suspense>
      </EmSection>
    </div>
  )
}
export default EmotionReportPage
