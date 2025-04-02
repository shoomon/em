import { Outlet } from "react-router-dom"

import MainHeader from "@/components/layout/MainHeader"
import MainNavigationBar from "@/components/layout/MainNavigationBar"
import useDevice from "@/hooks/useDevice"
import BaseLayout from "@/layout/BaseLayout"
import { cn } from "@/utils/cn"

interface MainLayoutProps {
  hasHeader?: boolean
}
const MainLayout = ({ hasHeader = true }: MainLayoutProps) => {
  const { isIOS } = useDevice()

  return (
    <BaseLayout>
      {hasHeader && (
        <div className="bg-em-white sticky top-0 max-w-[600px] w-full h-14 z-[110]">
          <MainHeader />
        </div>
      )}
      {/* main */}
      <main
        className={cn(
          "flex-1 flex flex-col",
          hasHeader
            ? "min-h-[calc(100vh-var(--navigation-bar-height)-var(--header-height))]"
            : "min-h-[calc(100vh-var(--navigation-bar-height))]",
        )}>
        <Outlet />
      </main>
      {/* navigation bar */}
      <div
        className={`bg-em-white sticky bottom-0 max-w-[600px] w-full h-16 z-[110] ${isIOS ? "pb-2" : ""}`}>
        <MainNavigationBar />
      </div>
    </BaseLayout>
  )
}

export default MainLayout
