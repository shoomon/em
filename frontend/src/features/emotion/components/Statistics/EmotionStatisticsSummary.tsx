import { EmotionKorNameType } from "../../types/emotion"

interface EmotionStatisticsSummaryProps {
  emotionName: EmotionKorNameType
}

const EmotionStatisticsSummary = ({
  emotionName,
}: EmotionStatisticsSummaryProps) => {
  return (
    <div className="bg-violet-50 p-4 rounded-lg shadow-sm">
      <p className="text-center text-gray-700 flex flex-col gap-2">
        <span>
          <span className="font-medium">이번 달에는</span>
          <span className="text-violet-600 font-bold mx-2">{emotionName}</span>
          <span>감정을</span>
        </span>
        <span>가장 많이 느끼셨어요!</span>
      </p>
    </div>
  )
}

export default EmotionStatisticsSummary
