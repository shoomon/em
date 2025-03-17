import { Outlet } from "react-router-dom"
import { useMemo } from "react"

import BaseLayout from "@/layout/BaseLayout"
import MainHeader from "@/components/layout/MainHeader"
import MainNavigationBar from "@/components/layout/MainNavigationBar"

const MainLayout = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  const isIOS = useMemo(() => {
    return (
      userAgent.includes("iphone") || //
      userAgent.includes("ipad") ||
      userAgent.includes("ipod")
    )
  }, [userAgent])

  return (
    <BaseLayout>
      {/* header */}
      <div className="fixed top-0 max-w-[600px] w-full h-14">
        <MainHeader />
      </div>
      {/* main */}
      <main className="flex-1 mt-14 mb-16">
        <Outlet />
      </main>
      {/* navigation bar */}
      <div className={`fixed bottom-0 max-w-[600px] w-full h-16 ${isIOS ? "pb-2" : ""}`}>
        <MainNavigationBar />
      </div>
    </BaseLayout>
  )
}

export default MainLayout
