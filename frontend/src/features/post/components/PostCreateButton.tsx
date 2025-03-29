import Button from "@/components/Button/Button"
import { MailPlus } from "lucide-react"

interface PostCreateButton {
  onClick: () => void
}

const PostCreateButton = ({ onClick }: PostCreateButton) => {
  return (
    <Button
      variant="outline"
      shape="circle"
      className="absolute z-10 p-2 shadow-md bottom-8 right-4 hover:bg-em-gray-md"
      onClick={onClick}>
      <MailPlus className="size-5" />
    </Button>
  )
}

export default PostCreateButton
