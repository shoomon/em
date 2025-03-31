import { MapPinIcon } from "lucide-react"

import { EMOTION_TEXT_COLOR_MAPPER } from "@/features/emotion/constants"
import { getRelativeTime } from "@/utils/time"
import { useEffect, useRef, useState } from "react"
import usePostDelete from "../hooks/usePostDelete"
import useReaction from "../hooks/useReaction"
import { Post, ReactionType } from "../types/post"
import ReactionButton from "./ReactionButton"

const PostItem = ({
  postId,
  isAuthor,
  nickname,
  imageUrl,
  emotion,
  content,
  emotionInfo,
  address,
  createdAt,
}: Post) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [isOverflow, setIsOverflow] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const {
    mutation: reactionMutation,
    likeCounts,
    likedByMe,
    clickedReaction,
    setClickedReaction,
  } = useReaction({ postId, emotionInfo })
  const postMutation = usePostDelete(postId)

  useEffect(() => {
    if (!contentRef.current) {
      return
    }

    setIsOverflow(
      contentRef.current.scrollHeight > contentRef.current.clientHeight,
    )
  }, [content])

  const handleMoreView = () => {
    setIsExpanded(!isExpanded)
  }

  const handleReaction = (reactionType: ReactionType) => {
    setClickedReaction(reactionType)
    reactionMutation.mutate(reactionType)
  }

  const handlePostDelete = () => {
    postMutation.mutate()
  }

  return (
    <div className={`flex flex-col gap-3 p-4 bg-em-white`}>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <MapPinIcon className="size-5 stroke-red-500" />
          <p className="text-sm font-semibold">{address}</p>
        </div>

        <p className="text-sm text-em-gray">{getRelativeTime(createdAt)}</p>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src={imageUrl}
            alt="프로필 사진"
            className="rounded-full size-8"
          />
          <p className={`font-semibold ${EMOTION_TEXT_COLOR_MAPPER[emotion]}`}>
            {nickname}
          </p>
        </div>

        {isAuthor && (
          <button
            className="text-sm cursor-pointer text-rose-400"
            onClick={handlePostDelete}>
            삭제
          </button>
        )}
      </div>

      <div
        ref={contentRef}
        className={`relative px-2 mb-10 overflow-hidden break-all whitespace-pre-wrap ${isExpanded ? "max-h-fit" : "max-h-32 line-clamp-5"}`}>
        {content}
        {isOverflow &&
          (isExpanded ? (
            <button
              className="block w-full text-sm cursor-pointer text-neutral-500"
              onClick={handleMoreView}>
              접기
            </button>
          ) : (
            <button
              className="absolute flex justify-center items-end inset-0 cursor-pointer text-sm text-neutral-500 bg-[linear-gradient(to_bottom,rgba(253,253,253,0)_0%,rgba(253,253,253,1)_90%,rgba(253,253,253,1)_100%)]"
              onClick={handleMoreView}>
              더보기
            </button>
          ))}
      </div>

      <div className="flex items-center gap-2">
        {Object.entries(likeCounts).map(([k, v]) => {
          if (k === "sum") {
            return null
          }

          return (
            <ReactionButton
              key={k}
              emotionName={k as ReactionType}
              count={v}
              isAnimating={clickedReaction === k}
              onClick={() => handleReaction(k as ReactionType)}
              onAnimationComplete={() => setClickedReaction(null)}
              className={likedByMe === k ? "font-bold text-amber-500" : ""}
            />
          )
        })}
      </div>
    </div>
  )
}

export default PostItem
