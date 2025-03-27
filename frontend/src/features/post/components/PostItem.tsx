import { MapPinIcon } from "lucide-react"

import profileImage from "@/assets/dog-face.svg"
import { getRelativeTime } from "@/utils/time"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { fetchPostReaction } from "../api/postApi"
import { EmojiType, Post } from "../types/post"
import EmojiButton from "./EmojiButton"

const PostItem = ({
  id,
  // userId,
  nickname,
  imageUrl,
  content,
  // lng,
  // lat,
  emotionInfo,
  address,
  createdAt,
}: Post) => {
  const [likeCounts, setLikeCounts] = useState(emotionInfo.emotionCounts)
  const [likedByMe, setLikedByMe] = useState(
    emotionInfo.selectedEmotion || null,
  )

  const mutation = useMutation({
    mutationFn: (selectedEmotion: EmojiType) =>
      fetchPostReaction(id, selectedEmotion.toUpperCase()),
    onMutate: async (selectedEmotion) => {
      if (!likedByMe) {
        return
      }

      setLikeCounts({
        ...likeCounts,
        [selectedEmotion]: likeCounts[selectedEmotion as EmojiType] + 1,
      })
      setLikedByMe((prev) =>
        prev === selectedEmotion ? null : selectedEmotion,
      )
    },
    onError: () => {
      // 요청에 실패하면 이전 상태로 롤백
      setLikeCounts(emotionInfo.emotionCounts)
      setLikedByMe(emotionInfo.selectedEmotion)
      alert("좋아요 요청에 실패 했습니다.")
    },
  })

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
        {Object.entries(emotionInfo.emotionCounts).map(([k, v]) => (
          <EmojiButton
            key={k}
            emotionName={k as EmojiType}
            count={v as number}
            onClick={() => mutation.mutate(k as EmojiType)}
          />
        ))}
      </div>
    </div>
  )
}

export default PostItem
