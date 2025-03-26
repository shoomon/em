import { Outlet } from "react-router-dom"

import StackHeader from "@/components/layout/StackHeader"
import BaseLayout from "@/layout/BaseLayout"

const StackLayout = () => {
  return (
    <BaseLayout>
      {/* header */}
      <div className="fixed bg-em-white top-0 h-[var(--header-height)] max-w-[600px] w-full">
        <StackHeader />
      </div>
      {/* main */}
      <main className="flex-1 mt-[var(--header-height)]">
        <Outlet />
      </main>
    </BaseLayout>
  )
}
export default StackLayout
