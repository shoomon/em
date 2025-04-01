import PostCreateForm from "@/features/post/components/PostCreate/PostCreateForm"
import useStackLayoutStore from "@/store/useStackLayoutStore"
import { useEffect } from "react"

const PostCreatePage = () => {
  const setTitle = useStackLayoutStore((state) => state.setTitle)

  useEffect(() => {
    setTitle("게시글 작성")

    return () => {
      setTitle("")
    }
  }, [])

  // 페이지 이탈 경고 로직 - 수정된 부분
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = "게시글 작성을 취소하시겠습니까?"
      return e.returnValue
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  return (
    <div className="w-full min-h-[calc(100dvh-var(--header-height)))] flex justify-center items-center">
      <PostCreateForm />
    </div>
  )
}
export default PostCreatePage
