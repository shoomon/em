import emptyImage from "@/assets/glum_bear.png"
import Button from "@/components/Button/Button"
import { TriangleAlertIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center gap-2 px-6 select-none scale-85 xs:px-12 min-h-dvh bg-em-white xs:scale-100">
      <div className="flex items-center gap-2">
        <TriangleAlertIcon className="size-10" />
        <p className="text-4xl font-bold">404</p>
      </div>

      <p className="text-4xl font-bold whitespace-pre-line leading-12">
        {"존재하지 않는\n페이지에요"}
      </p>
      <p className="text-xl whitespace-pre-line text-em-black/50">
        주소를 확인해 주세요
      </p>

      <img src={emptyImage} alt="" className="self-end w-64 my-6" />

      <Button className="font-bold" onClick={() => navigate("/")}>
        홈으로 돌아가기
      </Button>
    </div>
  )
}

export default NotFoundPage
