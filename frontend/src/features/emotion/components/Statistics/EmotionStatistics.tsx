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

  return (
    <div className="flex flex-col gap-6 h-full">
      {mostEmotion ? (
        <>
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
  )
}
export default EmotionStatistics
