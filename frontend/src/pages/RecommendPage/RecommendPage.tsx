import EmSection from "@/components/EmSection/EmSection"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"

const dummyData = [
  "https://i.maniadb.com/images/album/732/732046_1_f.jpg",
  "https://i.maniadb.com/images/album/747/747251_1_f.jpg",
  "https://i.maniadb.com/images/album/758/758815_1_f.jpg",
  "https://i.maniadb.com/images/album/767/767471_1_f.jpg",
  "https://i.maniadb.com/images/album/930/930973_1_f.jpg",
  "https://i.maniadb.com/images/album/763/763433_1_f.jpg",
  "https://i.maniadb.com/images/album/996/996760_1_f.jpg",
  "https://i.maniadb.com/images/album/1049/049251_1_f.jpg",
  "https://i.maniadb.com/images/album/788/788923_1_f.jpg",
]

const RecommendPage = () => {
  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false })
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollTo, setScrollTo] = useState<(index: number) => void>(
    () => () => {},
  )

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    setScrollTo(() => emblaApi.scrollTo)
    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi])

  return (
    <div className="h-[calc(100dvh-var(--navigation-bar-height)-var(--header-height))] ">
      <EmSection>
        <EmSection.Header
          title={"🎶 회원님을 위한 뮤직"}
          description={"회원님의 최근 감정을 반영하여 음악을 추천 드릴게요"}
        />

        <div ref={emblaRef} className="w-full overflow-hidden">
          <div className="flex">
            <div className="flex items-center justify-center flex-grow min-w-0 shrink-0 basis-full">
              <div className="grid grid-cols-3 gap-2 size-60 xs:size-72">
                {dummyData.map((item, index) => (
                  <div className="overflow-hidden">
                    <img
                      key={index}
                      src={item}
                      className="object-cover rounded-lg cursor-pointer select-none bg-em-gray-md size-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center flex-grow min-w-0 shrink-0 basis-full">
              <div className="grid grid-cols-3 gap-2 size-60 xs:size-72">
                {dummyData.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    className="object-cover rounded-lg cursor-pointer select-none bg-em-gray-md size-full"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center flex-grow min-w-0 shrink-0 basis-full">
              <div className="grid grid-cols-3 gap-2 size-60 xs:size-72">
                {dummyData.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    className="object-cover rounded-lg cursor-pointer select-none bg-em-gray-md size-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`size-3 rounded-full ${
                index === selectedIndex ? "bg-em-black" : "bg-em-gray-md"
              }`}
            />
          ))}
        </div>
      </EmSection>
    </div>
  )
}

export default RecommendPage
