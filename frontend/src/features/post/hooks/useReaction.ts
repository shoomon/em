import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { fetchPostReaction } from "../api/postApi"
import { ReactionType } from "../types/post"

interface UseReactionProps {
  postId: number
  emotionInfo: {
    selectedEmotion: string
    emotionCounts: {
      joy: number
      sadness: number
      anger: number
      surprise: number
      trust: number
      sum: number
    }
  }
}

const useReaction = ({ postId, emotionInfo }: UseReactionProps) => {
  const [likeCounts, setLikeCounts] = useState({ ...emotionInfo.emotionCounts })
  const [likedByMe, setLikedByMe] = useState(
    emotionInfo.selectedEmotion?.toLowerCase() || null,
  )
  const [clickedReaction, setClickedReaction] = useState<ReactionType | null>(
    null,
  )

  const mutation = useMutation({
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

  useEffect(() => {
    setLikeCounts({ ...emotionInfo.emotionCounts })
    setLikedByMe(emotionInfo.selectedEmotion?.toLowerCase())
  }, [emotionInfo])

  return {
    mutation,
    likeCounts,
    likedByMe,
    clickedReaction,
    setClickedReaction,
  }
}

export default useReaction
