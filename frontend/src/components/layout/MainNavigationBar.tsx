import { HomeIcon, UserIcon } from "lucide-react"
import { useCallback } from "react"
import { useLocation } from "react-router-dom"

import NavigationBarItem from "@/components/layout/NavigationBarItem"

const MainNavigationBar = () => {
  const { pathname } = useLocation()

  const navigationItems = [
    {
      id: 1,
      name: "홈",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      id: 2,
      name: "마이페이지",
      icon: <UserIcon />,
      path: "/mypage",
    },
  ]

  const isActive = useCallback((path: string) => pathname === path, [pathname])

  return (
    <nav className="flex items-center w-full h-full border-t border-em-gray-sm">
      {navigationItems.map((data) => (
        <NavigationBarItem key={data.id} data={data} isActive={isActive(data.path)} />
      ))}
    </nav>
  )
}
export default MainNavigationBar
