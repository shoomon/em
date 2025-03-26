import Button from "@/components/Button/Button"
import { RotateCwIcon } from "lucide-react"

interface PostRetetchButtonProps {
  onClick: () => void
}

const PostRefetchButton = ({ onClick }: PostRetetchButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={"outline"}
      className="absolute z-10 flex items-center gap-2 px-3 py-2 -translate-x-1/2 shadow-md top-12 left-1/2 hover:bg-em-gray-md">
      <RotateCwIcon className="size-5" />
      <p className="text-sm font-semibold">메시지 재탐색</p>
    </Button>
  )
}

export default PostRefetchButton
