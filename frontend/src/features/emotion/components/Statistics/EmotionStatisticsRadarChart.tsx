import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js"
import { ChartJSOrUndefined } from "node_modules/react-chartjs-2/dist/types"
import { useEffect, useRef } from "react"
import { Radar as RadarChart } from "react-chartjs-2"
import { EmotionKorNameType } from "../../types/emotion"

interface EmotionStatisticsRadarChartProps {
  emotionItemsLabels: EmotionKorNameType[]
  datasets: number[]
}

// 모든 필요한 플러그인 등록
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  CategoryScale,
  LinearScale,
)

const EmotionStatisticsRadarChart = ({
  emotionItemsLabels,
  datasets,
}: EmotionStatisticsRadarChartProps) => {
  const chartRef = useRef<ChartJSOrUndefined<"radar">>(null)

  const data: ChartData<"radar"> = {
    labels: emotionItemsLabels,
    datasets: [
      {
        data: datasets,
        backgroundColor: "#8979FF30",
        borderColor: "#8979FF",
        borderWidth: 2,
        pointBackgroundColor: "#8979FF",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#8979FF",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options: ChartOptions<"radar"> = {
    responsive: true,
    events: ["click", "mouseover"],
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      axis: "r",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        position: "nearest",
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 10,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 14,
        },
        displayColors: true,
        callbacks: {
          title: (tooltipItems) => {
            console.log(tooltipItems)
            return tooltipItems[0].label
          },
          label: (tooltipItem) => {
            console.log(tooltipItem)
            return `값: ${tooltipItem.formattedValue}`
          },
        },
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
        pointLabels: {
          font: {
            size: 12,
          },
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
    <div className="w-full h-96 max-h-[16rem]">
      <RadarChart
        className="w-full h-full"
        ref={chartRef}
        data={data}
        options={options}
      />
    </div>
  )
}
export default EmotionStatisticsRadarChart
