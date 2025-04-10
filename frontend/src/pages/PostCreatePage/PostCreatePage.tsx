import EmLoading from "@/components/EmLoading/EmLoading"
import PostCreateForm from "@/features/post/components/PostCreate/PostCreateForm"
import PostCreateProgress from "@/features/post/components/PostCreate/PostCreateProgress"
import PostFormProvider, {
  usePostForm,
} from "@/features/post/contexts/PostFormContext"
import useStackLayoutStore from "@/store/useStackLayoutStore"
import { useEffect } from "react"

const PostCreatePage = () => {
  const setTitle = useStackLayoutStore((state) => state.setTitle)
  const { isSubmitPending } = usePostForm()

  if (isSubmitPending) {
    return <EmLoading className="w-full h-dvh" />
  }

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

    window.addEventListener("beforeunload", handleBeforeUnload) // 페이지 이탈 경고 로직

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  return (
    <PostFormProvider>
      <div className="w-full min-h-[calc(100dvh-var(--header-height)))] flex flex-col justify-center items-center">
        <PostCreateProgress />
        <PostCreateForm />
      </div>
    </PostFormProvider>
  )
}
export default PostCreatePage
