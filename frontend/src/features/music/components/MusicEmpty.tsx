import emptyImage from "@/assets/music_bear.png"

interface MusicEmptyProps {
  description?: string
}

const MusicEmpty = ({ description }: MusicEmptyProps) => {
  return (
    <div className="relative h-full bg-em-white">
      <div className="absolute flex flex-col -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <p className="text-[clamp(3rem,4vw,6rem)] font-bold text-em-gray ">
          텅..
        </p>
        <p className="text-[clamp(0.8rem,4vw,1.2rem)] text-em-gray ">
          {description}
        </p>

        <img src={emptyImage} alt="" className="self-end w-1/2 my-4" />
      </div>
    </div>
  )
}

export default MusicEmpty
