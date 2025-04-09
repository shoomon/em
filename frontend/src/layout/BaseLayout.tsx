import { useEffect, type ReactNode } from "react"
import { useLocation } from "react-router-dom"

import useDevice from "@/hooks/useDevice"
interface BaseLayoutProps {
  children: ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const { isMobile } = useDevice()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div
      className={`flex relative flex-col max-w-[600px] bg-em-white mx-auto  ${!isMobile ? "" : ""}`}>
      {children}
    </div>
  )
}
export default BaseLayout
