import { MapPinIcon } from "lucide-react"

import { EMOTION_TEXT_COLOR_MAPPER } from "@/features/emotion/constants"
import { getRelativeTime } from "@/utils/time"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { fetchPostDelete, fetchPostReaction } from "../api/postApi"
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
  const [likeCounts, setLikeCounts] = useState({ ...emotionInfo.emotionCounts })
  const [likedByMe, setLikedByMe] = useState(
    emotionInfo.selectedEmotion?.toLowerCase() || null,
  )
  const [clickedReaction, setClickedReaction] = useState<ReactionType | null>(
    null,
  )
  const queryClient = useQueryClient()

  useEffect(() => {
    setLikeCounts({ ...emotionInfo.emotionCounts })
    setLikedByMe(emotionInfo.selectedEmotion?.toLowerCase())
  }, [emotionInfo])

  useEffect(() => {
    if (!contentRef.current) {
      return
    }

    setIsOverflow(
      contentRef.current.scrollHeight > contentRef.current.clientHeight,
    )
  }, [content])

  const reactionMutation = useMutation({
    mutationFn: (selectedEmotion: ReactionType) =>
      fetchPostReaction(postId, selectedEmotion.toUpperCase()),
    onMutate: (selectedEmotion: ReactionType) => {
      // 이전에 공감을 누른 적이 있는 상태
      if (likedByMe) {
        // 공감 취소하기
        if (likedByMe === selectedEmotion) {
          setLikeCounts({
            ...likeCounts,
            [selectedEmotion]: likeCounts[selectedEmotion] - 1,
          })
          setLikedByMe(null)
        }
        // 공감 변경하기
        else {
          setLikeCounts({
            ...likeCounts,
            [likedByMe]: likeCounts[likedByMe as ReactionType] - 1,
            [selectedEmotion]: likeCounts[selectedEmotion] + 1,
          })
          setLikedByMe(selectedEmotion)
        }
      }
      // 이전에 공감을 누른 적이 없는 상태
      else {
        setLikedByMe(selectedEmotion)
        setLikeCounts({
          ...emotionInfo.emotionCounts,
          [selectedEmotion]: emotionInfo.emotionCounts[selectedEmotion] + 1,
        })
      }
    },
    onError: () => {
      // 요청에 실패하면 이전 상태로 롤백
      setLikeCounts({ ...emotionInfo.emotionCounts })
      setLikedByMe(emotionInfo.selectedEmotion)
      alert("좋아요 요청에 실패 했습니다.")
    },
  })

  const postMutation = useMutation({
    mutationFn: () => fetchPostDelete(postId),
    onMutate: () => {
      if (!window.confirm("정말 삭제하시겠습니까?")) {
        throw new Error()
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["posts"] })
      alert("해당 메시지가 삭제 되었습니다.")
    },
  })

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
        className={`relative px-2 mb-4 overflow-hidden break-all whitespace-pre-wrap ${isExpanded ? "max-h-fit" : "max-h-32 line-clamp-5"}`}>
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
