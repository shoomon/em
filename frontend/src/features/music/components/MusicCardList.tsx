import { YoutubeDispatchContext } from "@/features/music/contexts/YoutubeContext"
import { Music, RecommendedMusic } from "@/features/music/types/music"
import useRecommendationMusic from "@/hooks/useRecommendationMusic"
import useEmblaCarousel from "embla-carousel-react"
import { Suspense, useContext } from "react"
import MusicCard from "./MusicCard"
import MusicCardSkeleton from "./MusicCardSkeleton"

const MusicCardList = () => {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)

  const { data, isPending } = useRecommendationMusic()
  const [customMusicRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "keepSnaps",
    align: "start",
  })
  const setQuery = useContext(YoutubeDispatchContext)

  const handleClickItem = (music: Music | RecommendedMusic) => {
    setQuery?.(music.artistName + " " + music.title + " topic")
  }

  return (
    <div ref={customMusicRef} className="-mx-5 overflow-hidden">
      <div className="flex gap-2 mx-5">
        {isPending
          ? Array.from({ length: 10 }).map((_, index) => (
              <MusicCardSkeleton key={index} />
            ))
          : data?.recommendations.map(
              (item: RecommendedMusic, index: number) => (
                <Suspense key={index} fallback={<MusicCardSkeleton />}>
                  <MusicCard
                    music={item}
                    onClick={() => handleClickItem(item)}
                  />
                </Suspense>
              ),
            )}
      </div>
    </div>
  )
}

export default MusicCardList
