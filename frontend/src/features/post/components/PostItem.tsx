import { MapPinIcon } from "lucide-react"

import profileImage from "@/assets/dog-face.svg"
import { Post } from "../types/post"
import EmojiButton from "./EmojiButton"
import { getRelativeTime } from "@/utils/time"

const PostItem = ({
  // userId,
  nickname,
  imageUrl,
  content,
  // lng,
  // lat,
  emotionCountList,
  address,
  createdAt,
}: Post) => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-em-white">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <MapPinIcon className="size-5 stroke-red-500" />
          <p className="text-sm font-semibold">{address}</p>
        </div>

        <p className="text-sm text-em-gray">{getRelativeTime(createdAt)}</p>
      </div>

      <div className="flex items-center gap-2">
        <img
          src={imageUrl || profileImage}
          alt="프로필 사진"
          className="rounded-full size-8"
        />
        <p className="font-semibold text-em-surprise">{nickname}</p>
      </div>

      <div className="px-2 mb-6 break-all whitespace-pre-wrap min-h-32">
        {content}
      </div>

      <div className="flex items-center gap-4">
        {/* {Object.entries(emotionCountList).map(([k, v]) => (
          <EmojiButton
            key={k}
            emotionName={k as keyof typeof emotionCountList}
            count={v as number}
          />
        ))} */}
        {["joy", "sadness", "anger", "surprise", "trust"].map((item, index) => (
          <EmojiButton
            key={index}
            emotionName={
              item as "joy" | "sadness" | "anger" | "surprise" | "trust"
            }
            count={0}
          />
        ))}
      </div>
    </div>
  )
}

export default PostItem
