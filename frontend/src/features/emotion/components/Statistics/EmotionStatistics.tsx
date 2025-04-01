import Button from "@/components/Button/Button"
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
import { Link } from "react-router-dom"
import useEmotionReport from "../../hooks/useEmotionReport"
import { EmotionKorNameType } from "../../types/emotion"
import EmotionGrid from "../EmotionGrid/EmotionGrid"
import EmotionStatisticsSummary from "./EmotionStatisticsSummary"

const EmotionStatistics = () => {
  const chartRef = useRef<ChartJSOrUndefined<"radar">>(null)
  ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler) // 차트 라이브러리 등록
  const { emotionItemsLabels, datasets, emotionPercentages, mostEmotion } =
    useEmotionReport()

  const data: ChartData<"radar"> = {
    labels: emotionItemsLabels,
    datasets: [
      {
        data: datasets,
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
          count: 5,
          display: false,
          stepSize: 20,
        },
        beginAtZero: true,
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
    <div className="flex flex-col gap-6 h-full">
      {mostEmotion() && (
        <div className="w-full h-96 max-h-[16rem]">
          <Radar
            className="w-full h-full"
            ref={chartRef}
            data={data}
            options={options}
          />
        </div>
      )}
      {mostEmotion() ? (
        <>
          <EmotionStatisticsSummary
            emotionName={mostEmotion() as EmotionKorNameType}
          />
          <EmotionGrid emotionPercentages={emotionPercentages} />
        </>
      ) : (
        <div className="w-full flex items-center flex-col gap-4 justify-center">
          <p className="text-sm text-gray-500">최근 기록이 없습니다.</p>
          <Link to="/posts/create" viewTransition>
            <Button className="hover" variant="outline">
              마음 기록하기
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
export default EmotionStatistics
