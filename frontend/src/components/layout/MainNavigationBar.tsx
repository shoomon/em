import {
  CalendarIcon,
  ChartPieIcon,
  MessageSquareHeartIcon,
  MusicIcon,
  UserIcon,
} from "lucide-react"
import { ReactNode, useMemo } from "react"

import NavigationBarItem from "@/components/layout/NavigationBarItem"

interface NavigationItem {
  id: number
  name: string
  icon: ReactNode
  path: string
}

const MainNavigationBar = () => {
  const navigationItems = useMemo<NavigationItem[]>(
    () => [
      {
        id: 1,
        name: "이음글",
        icon: <MessageSquareHeartIcon className="size-full" />,
        path: "/",
      },
      {
        id: 2,
        name: "이음악",
        icon: <MusicIcon className="size-full" />,
        path: "/recommend",
      },
      {
        id: 3,
        name: "감정 캘린더",
        icon: <CalendarIcon className="size-full" />,
        path: "/calendar",
      },
      {
        id: 4,
        name: "감정 리포트",
        icon: <ChartPieIcon className="size-full" />,
        path: "/emotion-report",
      },

      {
        id: 5,
        name: "마이페이지",
        icon: <UserIcon className="size-full" />,
        path: "/mypage",
      },
    ],
    [],
  )

  return (
    <nav className="flex items-center w-full h-full border-t border-em-gray-sm">
      {navigationItems.map((data) => (
        <NavigationBarItem key={data.id} data={data} />
      ))}
    </nav>
  )
}

export default MainNavigationBar
