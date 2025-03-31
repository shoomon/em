import { Outlet } from "react-router-dom"

import StackHeader from "@/components/layout/StackHeader"
import BaseLayout from "@/layout/BaseLayout"

const StackLayout = () => {
  return (
    <BaseLayout>
      {/* header */}
      <div className="sticky bg-em-white top-0 h-[var(--header-height)] max-w-[600px] z-40 w-full">
        <StackHeader />
      </div>
      {/* main */}
      <main className="flex-1 h-full flex">
        <Outlet />
      </main>
    </BaseLayout>
  )
}
export default StackLayout
