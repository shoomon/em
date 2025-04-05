import EmSection from "@/components/EmSection/EmSection"
import { Music } from "@/features/music/types/music"

import MusicCardList from "./MusicCardList"
import RecommendInfoPopover from "./RecommendInfoPopover"

interface MusicRecommendSectionProps {
  musicList: Music[]
}

const MusicRecommendSection = ({ musicList }: MusicRecommendSectionProps) => {
  return (
    <EmSection>
      <EmSection.Header
        title={"🎶 회원님을 위한 맞춤 뮤직"}
        description={"최근 감정들을 반영하여 음악을 추천해 드릴게요"}
        headerRight={<RecommendInfoPopover />}
      />
      <MusicCardList musicList={musicList} />
    </EmSection>
  )
}

export default MusicRecommendSection
