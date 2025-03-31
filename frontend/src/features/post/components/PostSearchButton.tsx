import Button from "@/components/Button/Button"
import { MailSearch } from "lucide-react"

interface PostSearchButtonProps {
  onClick: () => void
}

const PostSearchButton = ({ onClick }: PostSearchButtonProps) => {
  return (
    <Button
      variant={"outline"}
      className="absolute z-10 flex items-center gap-2 px-3 py-2 -translate-x-1/2 shadow-md bottom-8 left-1/2 hover:bg-em-gray-md"
      onClick={onClick}>
      <MailSearch className="size-5" />
      <p className="text-sm font-semibold">메세지 전체 보기</p>
    </Button>
  )
}

export default PostSearchButton
