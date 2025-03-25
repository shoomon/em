import EmDrawer from "@/components/drawer/EmDrawer"
import Tabs from "@/components/Tabs/Tabs"
import AddressDisplay from "@/features/map/components/AddressDisplay"
import LocationFixButton from "@/features/map/components/LocatonFixButton"
import MapViewer from "@/features/map/components/MapViewer"
import PostCreateButton from "@/features/post/components/PostCreateButton"
import PostList from "@/features/post/components/PostList"
import PostRefetchButton from "@/features/post/components/PostRefetchButton"
import PostSearchButton from "@/features/post/components/PostSearchButton"
import useDrawer from "@/hooks/useDrawer"
import useGps from "@/hooks/useGps"
import { useState } from "react"

const dummyData = [
  {
    id: 1,
    lat: 37.501286,
    lng: 127.0396029,
  },
  {
    id: 2,
    lat: 37.5013068,
    lng: 127.0371728,
  },
  {
    id: 3,
    lat: 37.5033214,
    lng: 127.0384099,
  },
  {
    id: 4,
    lat: 37.5031847,
    lng: 127.0392911,
  },
]

const HomePage = () => {
  const tabs = [
    { value: "posts", label: "이곳에 남긴 글" },
    { value: "playlist", label: "이곳의 플레이리스트" },
  ]
  const { isDenied, currentPosition, lastFetchedPosition } = useGps()
  const { isOpen, setIsOpen } = useDrawer("home")
  const [currentTab, setCurrentTab] = useState<"posts" | "playlist">("posts")

  const renderTabContent = () => {
    switch (currentTab) {
      case "posts":
        return <PostList />
      default:
        return <div className="h-[75dvh]"></div>
    }
  }

  return (
    <div className="relative h-[calc(100dvh-var(--header-height)-var(--navigation-bar-height))]">
      <AddressDisplay lastFetchedPosition={lastFetchedPosition} />
      <PostRefetchButton onClick={() => {}} />
      <MapViewer
        className="h-full"
        isDenied={isDenied}
        location={currentPosition}
        posts={dummyData}>
        {(focusOnMarker) => <LocationFixButton onClick={focusOnMarker} />}
      </MapViewer>
      <PostCreateButton onClick={() => {}} />
      <PostSearchButton onClick={() => setIsOpen(true)} />

      <EmDrawer open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
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
