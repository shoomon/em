import EmLoading from "@/components/EmLoading/EmLoading"
import EmSection from "@/components/EmSection/EmSection"
import EmotionCalendar from "@/features/history/components/EmotionCalendar"
import { Suspense } from "react"

interface CalendarPageProps {}

const CalendarPage = ({}: CalendarPageProps) => {
  return (
    <div>
      {/* <section className="p-4 flex flex-col gap-6 relative">
        <UserProfileCard />
      </section> */}
      <EmSection>
        <EmSection.Header title="🗓️ 나의 감정 달력" />
        <Suspense fallback={<EmLoading />}>
          <div className="flex flex-col">
            <EmotionCalendar />
          </div>
        </Suspense>
      </EmSection>
    </div>
  )
}
export default CalendarPage
