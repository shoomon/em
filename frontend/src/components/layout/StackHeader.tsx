import useStackLayoutStore from "@/store/useStackLayoutStore"
import { ChevronLeftIcon } from "lucide-react"
import { memo } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const StackHeader = memo(() => {
  // Todo: Header 타이틀을 zustand로 관리하는 것에 대하여 논의
  const title = useStackLayoutStore((state) => state.title)
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    // PostCreatePage에서만 확인 메시지 표시, 다른 페이지에서는 바로 뒤로가기
    if (location.pathname === "/posts/create") {
      const shouldLeave = confirm("게시글 작성을 취소하시겠습니까?")
      if (shouldLeave) {
        navigate("/", { replace: true, viewTransition: true })
      }
    } else if (location.pathname === "/mypage/list") {
      // MyPostListPage에서는 마이페이지로 이동
      navigate("/mypage", { viewTransition: true })
    } else {
      // 기본적으로는 홈으로 이동
      navigate("/", { viewTransition: true })
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
