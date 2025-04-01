import { EMOTION_ITEMS } from "../../constants"
import { EmotionAnalysisResponse } from "../../types/emotion"
import EmotionSelectItem from "../EmotionSelectItem"

interface EmotionAnalysisProps {
  data: EmotionAnalysisResponse
}

const EmotionAnalysis = ({ data }: EmotionAnalysisProps) => {
  const mockEmotionScores = {
    ANGER: 35,
    SURPRISE: 50,
    JOY: 85,
    TRUST: 65,
    SADNESS: 25,
    FEAR: 15,
    ANTICIPATION: 75,
    DISGUST: 20,
  }

  console.log(data)

  // Top 3 감정 추출
  const topEmotions = Object.entries(mockEmotionScores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .slice(0, 3)
    .map(([emotion]) => emotion)

  return (
    <div className="flex flex-col bg-white p-6 gap-5">
      <h1 className="text-xl font-bold text-gray-800">💡 감정 분석 결과</h1>

      <div className="mb-2">
        <h2 className="text-md font-medium text-gray-600 mb-3">
          🌟 주요 감정 🌟
        </h2>
        <div className="flex gap-3">
          {topEmotions.map((emotionName) => {
            const emotion = EMOTION_ITEMS.find((e) => e.engName === emotionName)
            if (!emotion) return null

            return (
              <div className="flex flex-col items-center w-full gap-1">
                <EmotionSelectItem
                  key={emotion.id}
                  emotion={emotion}
                  onSelect={console.log}
                />
                <span>{"00%"}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default EmotionAnalysis
