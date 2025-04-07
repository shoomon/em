import EmLoading from "@/components/EmLoading/EmLoading"
import EmSection from "@/components/EmSection/EmSection"
import EmotionCalendar from "@/features/history/components/EmotionCalendar"
import MyPostList from "@/features/history/components/MyPostList"
import { useMyPostsByDate } from "@/features/history/hooks/useMyPostsByDate"
import { AnimatePresence, motion } from "framer-motion"
import { Suspense, useState } from "react"

const CalendarPage = () => {
  const formatToYMD = (timestamp: number): string => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const [selectedDate, setSelectedDate] = useState<string>(
    formatToYMD(Date.now()),
  )

  // const formattedDate = useMemo(() => formatDateToYMD(selectedDate), [selectedDate])
  const { postList, isLoading, mutation } = useMyPostsByDate(selectedDate)

  const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-")
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`
  }

  return (
    <div className="flex flex-col flex-1 gap-6">
      {/* <section className="relative flex flex-col gap-6 p-4">
        <UserProfileCard />
      </section> */}
      <EmSection className="gap-2 pb-0">
        <EmSection.Header title="🗓️ 나의 감정 달력" />
        <Suspense fallback={<EmLoading />}>
          <div className="flex flex-col">
            <EmotionCalendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>
        </Suspense>
      </EmSection>
      {selectedDate && (
        <div className="flex-grow w-full p-4 pt-0 bg-em-gray-md">
          {isLoading ? (
            <div className="h-40 bg-em-gray-md animate-pulse rounded-xl" />
          ) : (
            <div className="flex flex-col">
              <div>
                <p className="py-4 pl-2 text-lg font-semibold text-em-black">
                  {formatDate(selectedDate)}
                </p>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDate}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{ duration: 0.2 }}>
                  <MyPostList
                    postList={postList}
                    onDeletePost={mutation.mutate}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default CalendarPage
