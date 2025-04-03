import useStackLayoutStore from "@/store/useStackLayoutStore"
import { XIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

const FullScreenHeader = ({}) => {
  const navigate = useNavigate()

  const title = useStackLayoutStore((state) => state.title)

  const handleClick = () => {
    if (!document.startViewTransition) {
      navigate(-1)
    } else {
      document.startViewTransition(() => {
        navigate(-1)
      })
    }
  }

  return (
    <header className="flex items-center justify-between h-full px-4 view-transition-header">
      <div
        onClick={handleClick}
        className="cursor-pointer basis-1/8 view-transition-icon">
        <XIcon className="size-7" />
      </div>

      <div className="flex-1">
        <h3 className="text-base text-center font-extrabold text-em-black view-transition-title">
          {title}
        </h3>
      </div>
      <div className="basis-1/8"></div>
    </header>
  )
}

export default FullScreenHeader
