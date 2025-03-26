import PostCreateForm from "@/features/post/components/PostCreateForm"
import useStackLayoutStore from "@/store/useStackLayoutStore"
import { useEffect } from "react"

const PostCreatePage = () => {
  const setTitle = useStackLayoutStore((state) => state.setTitle)

  useEffect(() => {
    setTitle("게시글 작성")
  }, [])
  return (
    <div className="h-full w-full flex justify-center items-center">
      <PostCreateForm />
    </div>
  )
}
export default PostCreatePage
