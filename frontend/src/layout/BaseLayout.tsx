import type { ReactNode } from "react"

interface BaseLayoutProps {
  children: ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="flex relative flex-col min-h-screen max-h-screen max-w-[600px] mx-auto">
      {children}
    </div>
  )
}
export default BaseLayout
