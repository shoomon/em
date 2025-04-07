import {
  EmotionKorNameType,
  EmotionMapping,
} from "@/features/emotion/types/emotion"
import useEmblaCarousel from "embla-carousel-react"
import MusicChartCategoryButtonButton from "./MusicChartCategoryButton"

interface MusicCategorySelectorProps {
  selectedCategory: EmotionKorNameType
  onSelect: (emotion: EmotionKorNameType) => void
}

const MusicCategorySelector = ({
  selectedCategory,
  onSelect,
}: MusicCategorySelectorProps) => {
  const [categoryMusicRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "keepSnaps",
    align: "start",
  })

  return (
    <div ref={categoryMusicRef} className="-mx-5 overflow-hidden">
      <div className="flex gap-3 mx-5">
        {Object.keys(EmotionMapping).map((item) => {
          if (item === "기대" || item === "확신" || item === "혐오") {
            return null
          }

          return (
            <MusicChartCategoryButtonButton
              key={item}
              selected={item === selectedCategory}
              label={item}
              onClick={() => onSelect(item as EmotionKorNameType)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default MusicCategorySelector
