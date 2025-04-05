import MusicCard from "@/features/music/components/MusicCard"
import { Music } from "@/features/music/types/music"
import useEmblaCarousel from "embla-carousel-react"

interface MusicCardListProps {
  musicList: Music[]
}

const MusicCardList = ({ musicList }: MusicCardListProps) => {
  const [customMusicRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "keepSnaps",
    align: "start",
  })

  return (
    <div ref={customMusicRef} className="-mx-5 overflow-hidden">
      <div className="flex gap-2 mx-5">
        {musicList.map((item) => (
          <MusicCard key={item.musicId} music={item} />
        ))}
      </div>
    </div>
  )
}

export default MusicCardList
