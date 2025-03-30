import {
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  LineElement,
  PointElement,
  RadialLinearScale,
} from "chart.js"
import { ChartJSOrUndefined } from "node_modules/react-chartjs-2/dist/types"
import { useEffect, useRef } from "react"
import { Radar } from "react-chartjs-2"
import { EMOTION_ITEMS } from "../../constants"
import useEmotionStatistics from "../../hooks/useEmotionStatistics"
import { EmotionStatisticsData } from "../../types/emotion"

const initialEmotionStatisticsData: EmotionStatisticsData = {
  ANGER: 1,
  SURPRISE: 2,
  JOY: 3,
  TRUST: 4,
  SADNESS: 5,
  FEAR: 6,
  ANTICIPATION: 7,
  DISGUST: 8,
}

const EmotionStatistics = () => {
  const chartRef = useRef<ChartJSOrUndefined<"radar">>(null)
  ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler) // 차트 라이브러리 등록

  const { data: emotionStatistics } = useEmotionStatistics()

  // 감정 통계 데이터
  const emotionStatisticsData: EmotionStatisticsData =
    emotionStatistics || initialEmotionStatisticsData

  // 감정 아이템 라벨 정렬 (사전 순)
  const EMOTION_ITEMS_LABELS = EMOTION_ITEMS.map((item) => item.korName).sort(
    (a, b) => a.localeCompare(b),
  )

  const data: ChartData<"radar"> = {
    labels: EMOTION_ITEMS_LABELS,
    datasets: [
      {
        data: [
          emotionStatisticsData.ANGER,
          emotionStatisticsData.SURPRISE,
          emotionStatisticsData.JOY,
          emotionStatisticsData.TRUST,
          emotionStatisticsData.SADNESS,
          emotionStatisticsData.FEAR,
          emotionStatisticsData.ANTICIPATION,
          emotionStatisticsData.DISGUST,
        ],
        backgroundColor: "#8979FF30",
        borderColor: "#8979FF",
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<"radar"> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      r: {
        ticks: {
          display: false,
        },
      },
    },
  }

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 차트 정리
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full h-full max-h-[16rem] flex-1">
      <Radar ref={chartRef} data={data} options={options} />
    </div>
  )
}
export default EmotionStatistics
