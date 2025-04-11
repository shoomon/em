import letterIcon from "@/assets/love_letter.svg"
import Button from "@/components/Button/Button"

interface PostSearchButtonProps {
  onClick: () => void
}

const PostSearchButton = ({ onClick }: PostSearchButtonProps) => {
  return (
    <Button
      variant={"outline"}
      className="absolute z-10 flex items-center gap-2 px-3 py-1.5 -translate-x-1/2 shadow-md bottom-8 left-1/2 hover:bg-em-gray-md"
      onClick={onClick}>
      <img src={letterIcon} alt="" className="size-6" />
      <p className="text-sm font-semibold">이음글 모아 보기</p>
    </Button>
  )
}

export default PostSearchButton
