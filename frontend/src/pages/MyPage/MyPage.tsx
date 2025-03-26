import { lazy, Suspense, useEffect, useState } from "react"

import Tabs from "@/components/Tabs/Tabs"
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
        return (
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-em-black">
              이 달의 통계
            </h3>
            <div className="bg-em-gray-sm p-4 rounded shadow text-em-black">
              📊 추후 업데이트 됩니다!
            </div>
          </div>
        )
      default:
        return <div className="h-[600px]"></div>
    }
  }

  return (
    <div className="flex flex-col h-screen bg-em-white">
      <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-6">
        <UserProfileCard />

        <Tabs
          tabs={tabs}
          activeTab={currentTab}
          onTabChange={(tabValue: string) =>
            setCurrentTab(tabValue as "history" | "report")
          }
        />
        {renderTabContent()}
      </div>
    </div>
  )
}

export default MyPage
