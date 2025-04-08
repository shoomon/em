import { AnimatePresence, motion } from "framer-motion"
import { useMemo } from "react"
import useEmotionReport from "../../hooks/useEmotionReport"
import { EmotionKorNameType } from "../../types/emotion"
import EmotionGrid from "../EmotionGrid/EmotionGrid"
import EmotionStatisticsEmpty from "./EmotionStatisticsEmpty"
import EmotionStatisticsRadarChart from "./EmotionStatisticsRadarChart"
import EmotionStatisticsSummary from "./EmotionStatisticsSummary"

interface EmotionStatisticsProps {
  date: Date
}

const EmotionStatistics = ({ date }: EmotionStatisticsProps) => {
  const { emotionItemsLabels, datasets, mostEmotion, emotionReport } =
    useEmotionReport(date)

  const dateRange = useMemo(() => {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    return `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
  }, [date])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={date.toISOString()}
        className="w-full h-full overflow-hidden"
        initial={{ opacity: 0, transform: "translateY(-10px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        exit={{ opacity: 0, transform: "translateY(10px)" }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}>
        <div className="flex flex-col gap-6 h-full px-1">
          {mostEmotion ? (
            <>
              <span className="text-sm sm:text-left text-center text-em-black/50">{`🗓️ 기간 : ${dateRange}`}</span>
              <EmotionStatisticsRadarChart
                emotionItemsLabels={emotionItemsLabels}
                datasets={datasets}
              />
              <EmotionStatisticsSummary
                emotionName={mostEmotion as EmotionKorNameType}
              />
              <EmotionGrid
                emotionReport={emotionReport}
                mostEmotion={mostEmotion}
              />
            </>
          ) : (
            <EmotionStatisticsEmpty />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
export default EmotionStatistics
