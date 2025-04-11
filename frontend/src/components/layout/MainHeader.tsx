import { memo } from "react"
import { Link } from "react-router-dom"

import logo from "@/assets/em_logo.svg"

const MainHeader = memo(
  () => {
    // TODO : 알림이 있을 경우 UI 변경
    return (
      <header className="flex items-center justify-between h-full px-5 border-b border-em-gray-sm">
        <Link
          to="/main"
          className="flex items-center justify-center h-full cursor-pointer">
          <img src={logo} alt="logo" className="w-full" />
        </Link>
      </header>
    )
  },
  () => true,
)

export default MainHeader
