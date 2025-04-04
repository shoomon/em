import {
  EMOTION_BORDER_COLOR_MAPPER,
  EMOTION_TEXT_COLOR_MAPPER,
} from "@/features/emotion/constants"
import ReactionButton from "@/features/post/components/ReactionButton"
import useReaction from "@/features/post/hooks/useReaction"
import { Post, ReactionType } from "@/features/post/types/post"
import { getRelativeTime } from "@/utils/time"
import { ListMusicIcon, MapPinIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface PostItemProps extends Post {
  onDelete: () => void
}

const PostItem = ({
  postId,
  isAuthor,
  nickname,
  imageUrl,
  emotion,
  content,
  musicInfo,
  emotionInfo,
  address,
  createdAt,
  onDelete,
}: PostItemProps) => {
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

  return (
    <div className={`flex flex-col gap-3 p-4 bg-em-white`}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`font-semibold border ${EMOTION_BORDER_COLOR_MAPPER[emotion]} rounded-full p-0.5`}>
            <img src={imageUrl || ""} alt="" className="object-cover size-8" />
          </div>

          <div>
            <p
              className={`font-semibold ${EMOTION_TEXT_COLOR_MAPPER[emotion]}`}>
              {nickname}
            </p>

            <div className="flex items-center gap-0.5">
              <MapPinIcon className="size-3 stroke-em-black/80" />
              <p className="text-xs font-semibol text-em-black/80">{address}</p>
            </div>
          </div>
        </div>

        <div className="text-end">
          <p className="text-sm text-em-gray">{getRelativeTime(createdAt)}</p>

          {isAuthor && (
            <button
              className="self-start text-sm cursor-pointer text-rose-400"
              onClick={onDelete}>
              삭제
            </button>
          )}
        </div>
      </div>

      {content && (
        <div
          ref={contentRef}
          className={`relative px-2 mb-6 overflow-hidden break-all whitespace-pre-wrap ${isExpanded ? "max-h-fit" : "max-h-32 line-clamp-5"}`}>
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
      )}

      {musicInfo && (
        <div className="flex items-center gap-1 px-2 py-1 border border-green-400 rounded-full w-fit max-w-2/3 bg-em-white">
          <ListMusicIcon className="stroke-green-400 size-4 shrink-0" />
          <p className="text-xs break-all line-clamp-1">
            {musicInfo.artistName} - {musicInfo.title}
          </p>
        </div>
      )}

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
