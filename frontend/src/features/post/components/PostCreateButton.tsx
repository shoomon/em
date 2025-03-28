import Button from "@/components/Button/Button"
import { SendIcon } from "lucide-react"

interface PostCreateButton {
  onClick: () => void
}

const PostCreateButton = ({ onClick }: PostCreateButton) => {
  return (
    <Button
      variant="outline"
      shape="circle"
      className="absolute z-10 p-2 px-4 shadow-md bottom-10 right-4 hover:bg-em-gray-md"
      onClick={onClick}>
      <div className="flex items-center gap-2">
        <SendIcon className="w-5 h-5" />
        <span className="hidden md:opacity-100 md:block opacity-0 transition-all duration-300">
          글쓰기
        </span>
      </div>
    </Button>
  )
}

export default PostCreateButton
