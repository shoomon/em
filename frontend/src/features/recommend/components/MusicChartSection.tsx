import EmSection from "@/components/EmSection/EmSection"
import {
  EmotionKorNameType,
  EmotionMapping,
} from "@/features/emotion/types/emotion"
import { Music } from "@/features/music/types/music"
import { useState } from "react"
import MusicCategorySelector from "./MusicChartCategorySelector"
import MusicChartList from "./MusicChartList"

interface MusicChartSectionProps {
  musicList: Music[]
}

const MusicChartSection = ({ musicList }: MusicChartSectionProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<EmotionKorNameType>("기쁨")

  return (
    <EmSection>
      <EmSection.Header
        title={"📊 이음 차트"}
        description={"감정별 인기 음악을 살펴 보세요"}
      />

      <div className="flex flex-col gap-4">
        <MusicCategorySelector
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <MusicChartList
          category={EmotionMapping[selectedCategory]}
          musicList={musicList}
        />
      </div>
    </EmSection>
  )
}

export default MusicChartSection
