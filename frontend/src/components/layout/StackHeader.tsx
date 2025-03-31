import useStackLayoutStore from "@/store/useStackLayoutStore"
import { ChevronLeftIcon } from "lucide-react"
import { memo } from "react"
import { useNavigate } from "react-router-dom"

const StackHeader = memo(() => {
  // Todo: Header 타이틀을 zustand로 관리하는 것에 대하여 논의
  const title = useStackLayoutStore((state) => state.title)

  const navigate = useNavigate()

  const handleClick = () => {
    const shouldLeave = confirm("게시글 작성을 취소하시겠습니까?")
    if (shouldLeave) {
      navigate("/", { replace: true, viewTransition: true })
    }
  }

  return (
    <header className="flex items-center justify-between h-full px-5">
      <div onClick={handleClick} className="cursor-pointer basis-1/3">
        <ChevronLeftIcon className="w-8 h-8" />
      </div>

      <div className="basis-1/3">
        <h3 className="text-xl text-center font-bold text-em-black">{title}</h3>
      </div>
      <div className="basis-1/3"></div>
    </header>
  )
})
export default StackHeader
