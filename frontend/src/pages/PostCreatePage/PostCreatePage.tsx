import PostCreateForm from "@/features/post/components/PostCreateForm"
import useStackLayoutStore from "@/store/useStackLayoutStore"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const PostCreatePage = () => {
  const location = useLocation()
  const setTitle = useStackLayoutStore((state) => state.setTitle)

  useEffect(() => {
    setTitle("게시글 작성")
  }, [])

  // 현재 페이지에서 벗어날 때 타이틀 초기화
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      if (confirm("게시글 작성을 취소하시겠습니까?")) {
        setTitle("")
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [location])

  return (
    <div className="w-full flex-1 flex justify-center items-center">
      <PostCreateForm />
    </div>
  )
}
export default PostCreatePage
