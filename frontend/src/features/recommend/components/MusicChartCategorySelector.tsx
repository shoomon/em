import {
  EmotionKorNameType,
  EmotionMapping,
} from "@/features/emotion/types/emotion"
import useEmblaCarousel from "embla-carousel-react"

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
        {Object.keys(EmotionMapping).map((item) => (
          <button
            className={`cursor-pointer text-em-gray px-3 py-0.5 text-sm xs:text-base border rounded-full border-em-gray-md shrink-0 ${item === selectedCategory ? "bg-em-black text-em-white" : ""}`}
            onClick={() => onSelect(item as EmotionKorNameType)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MusicCategorySelector
