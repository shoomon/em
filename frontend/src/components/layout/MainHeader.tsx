import { BellIcon } from "lucide-react"
import { Link } from "react-router-dom"

import logo from "@/assets/em_logo.svg"

const MainHeader = () => {
  // TODO : 알림이 있을 경우 UI 변경
  return (
    <header className="flex items-center justify-between h-full px-5 border-b border-em-gray-sm">
      <div className="flex items-center justify-center h-full cursor-pointer">
        <Link to="/" className="flex items-center justify-center w-full h-full">
          <img src={logo} alt="logo" className="w-full" />
        </Link>
      </div>
      <div className="flex items-center justify-center h-full px-3 cursor-pointer">
        <BellIcon className="size-6 text-em-gray" fill="currentColor" />
      </div>
    </header>
  )
}
export default MainHeader
