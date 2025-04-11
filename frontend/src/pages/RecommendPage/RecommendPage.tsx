import MusicChartSection from "@/features/recommend/components/MusicChartSection"
import MusicRecommendSection from "@/features/recommend/components/MusicRecommendSection"
import RecommendIntroAnimation from "@/features/recommend/components/RecommendIntroAnimation"
import { useState } from "react"

const RecommendPage = () => {
  const [isIntroPlaying, setIsIntroPlaying] = useState(true)

  return (
    <div className="relative">
      <MusicRecommendSection />
      <MusicChartSection />
      {isIntroPlaying && (
        <RecommendIntroAnimation onComplete={() => setIsIntroPlaying(false)} />
      )}
    </div>
  )
}

export default RecommendPage
