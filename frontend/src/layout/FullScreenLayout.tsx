import FullScreenHeader from "@/components/layout/FullScreenHeader"
import { Outlet } from "react-router-dom"
import BaseLayout from "./BaseLayout"

const FullScreenLayout = () => {
  return (
    <BaseLayout>
      <div className="sticky bg-em-white top-0 h-[var(--header-height)] max-w-[600px] z-40 w-full">
        <FullScreenHeader />
      </div>
      <main className="h-full w-full">
        <Outlet />
      </main>
    </BaseLayout>
  )
}
export default FullScreenLayout
