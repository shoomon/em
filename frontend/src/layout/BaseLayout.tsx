import type { ReactNode } from "react"

import useDevice from "@/hooks/useDevice"
interface BaseLayoutProps {
  children: ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const { isMobile } = useDevice()
  return (
    <div
      className={`flex relative flex-col min-h-screen max-w-[600px] bg-em-white mx-auto ${!isMobile ? "" : ""}`}>
      {children}
    </div>
  )
}
export default BaseLayout
