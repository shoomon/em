import { lazy, Suspense, useEffect, useState } from "react"

import Tabs from "@/components/Tabs/Tabs"
import LogoutText from "@/features/auth/components/LogoutText"
import EmotionStatisticsSection from "@/features/emotion/components/Statistics/EmotionStatisticsSection"
import UserProfileCard from "@/features/profile/components/UserProfileCard"

const LazyEmotionCalendar = lazy(
  () => import("@/features/history/components/EmotionCalendar"),
)

const MyPage = () => {
  const tabs = [
    { value: "history", label: "나의 감정 달력" },
    { value: "report", label: "나의 감정 리포트" },
  ]

  const [currentTab, setCurrentTab] = useState<"history" | "report">(() => {
    const saved = localStorage.getItem("mypage-tab")
    return saved === "history" || saved === "report" ? saved : "history"
  })

  useEffect(() => {
    localStorage.setItem("mypage-tab", currentTab)
  }, [currentTab])

  const renderTabContent = () => {
    switch (currentTab) {
      case "history":
        return (
          <Suspense
            fallback={
              <div className="mt-6 flex justify-center text-em-gray">
                감정 달력을 불러오는 중...
              </div>
            }>
            <div className="flex flex-col gap-3">
              <LazyEmotionCalendar />
            </div>
          </Suspense>
        )
      case "report":
        return <EmotionStatisticsSection />
      default:
        return <div className="h-[600px]"></div>
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-var(--navigation-bar-height))]">
      <section className="p-4 flex flex-col gap-6 relative">
        <UserProfileCard />
        <div className="w-full sticky top-0 z-50 bg-em-white">
          <Tabs
            tabs={tabs}
            activeTab={currentTab}
            onTabChange={(tabValue: string) =>
              setCurrentTab(tabValue as "history" | "report")
            }
          />
        </div>
      </section>
      {renderTabContent()}
      <div className="flex flex-1 justify-end items-end h-full p-4">
        <LogoutText />
      </div>
    </div>
  )
}

export default MyPage
