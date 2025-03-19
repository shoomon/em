import EmDrawer from "@/components/drawer/EmDrawer"
import Tabs from "@/components/Tabs/Tabs"
import MapViewer from "@/features/map/components/MapViewer"
import PostList from "@/features/post/components/PostList"
import useDrawer from "@/hooks/useDrawer"
import { LocateFixedIcon, MailSearch, MapPinIcon, RotateCwIcon, SendIcon } from "lucide-react"
import { useState } from "react"

const HomePage = () => {
  const tabs = [
    { value: "posts", label: "이곳에 남긴 글" },
    { value: "playlist", label: "이곳의 플레이리스트" },
  ]

  const { isOpen, setIsOpen } = useDrawer("home")
  const [currentTab, setCurrentTab] = useState<"posts" | "playlist">("posts")

  const renderTabContent = () => {
    switch (currentTab) {
      case "posts":
        return <PostList />
      default:
        return <div className="h-[600px]"></div>
    }
  }

  return (
    <div className="relative h-[calc(100vh-7.5rem)]">
      <div className="absolute top-0 left-0 z-10 flex items-center w-full gap-2 p-3 bg-gradient-to-b from-em-white via-em-white/80 to-em-white/10">
        <MapPinIcon className="stroke-red-500" />
        <p className="font-semibold">서울 강남구 테헤란로 212</p>
      </div>

      <button className="absolute z-10 flex items-center gap-2 px-3 py-2 -translate-x-1/2 bg-white border rounded-lg shadow-md cursor-pointer top-12 left-1/2 border-neutral-200">
        <RotateCwIcon className="size-5" />
        <p className="text-sm font-semibold">메시지 재탐색</p>
      </button>

      <MapViewer className="relative h-full">
        {(focusOnMarker) => (
          <button
            className="absolute z-10 p-2 bg-white border rounded-full shadow-md cursor-pointer bottom-24 right-4 border-neutral-200"
            onClick={focusOnMarker}>
            <LocateFixedIcon />
          </button>
        )}
      </MapViewer>

      <button className="absolute z-10 p-2 bg-white border rounded-full shadow-md cursor-pointer bottom-8 right-4 border-neutral-200">
        <SendIcon />
      </button>

      <EmDrawer
        open={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
        trigger={
          <div className="absolute z-10 flex items-center gap-2 px-3 py-2 -translate-x-1/2 bg-white border rounded-lg shadow-md cursor-pointer bottom-8 left-1/2 border-neutral-200">
            <MailSearch className="size-5" />
            <p className="text-sm font-semibold">메세지 전체 보기</p>
          </div>
        }>
        <div>
          <Tabs
            tabs={tabs}
            activeTab={currentTab}
            onTabChange={(tabValue: string) => setCurrentTab(tabValue as "posts" | "playlist")}
          />
          {renderTabContent()}
        </div>
      </EmDrawer>
    </div>
  )
}

export default HomePage
