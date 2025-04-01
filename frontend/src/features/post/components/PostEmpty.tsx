import emptyImage from "@/assets/em_bear.png"

const PostEmpty = () => {
  return (
    <div className="relative h-full bg-em-white">
      <div className="absolute flex flex-col -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <p className="text-[clamp(3rem,4vw,6rem)] font-bold text-em-gray ">
          텅..
        </p>
        <p className="text-[clamp(0.8rem,4vw,1.2rem)] text-em-gray ">
          이곳에는 메시지가 없어요
          <br />
          가장 먼저 메시지를 남겨보세요!
        </p>

        <img src={emptyImage} alt="" className="self-end w-1/2 my-4" />
      </div>
    </div>
  )
}

export default PostEmpty
