import EmDrawer from "@/components/drawer/EmDrawer"
import Tabs from "@/components/Tabs/Tabs"
import MapController from "@/features/map/components/MapController"
import PostCreateButton from "@/features/post/components/PostCreate/PostCreateButton"
import PostList from "@/features/post/components/PostList"
import PostSearchButton from "@/features/post/components/PostSearchButton"
import useDrawer from "@/hooks/useDrawer"
import useGps from "@/hooks/useGps"
import usePostStore from "@/store/usePostStore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const tabs = [
  { value: "posts", label: "이곳에 남긴 글" },
  { value: "playlist", label: "이곳의 플레이리스트" },
]

const HomePage = () => {
  const {
    isLocationPermissionGranted,
    setIsStoppedWatching,
    currentLocation,
    lastFetchedLocation,
  } = useGps()
  const [currentTab, setCurrentTab] = useState<"posts" | "playlist">("posts")
  const { setType, isDrawerOpen, setIsDrawerOpen } = usePostStore()
  const { isOpen, setIsOpen } = useDrawer({
    drawerKey: "home",
    isOpen: isDrawerOpen,
    setIsOpen: (isDrawerOpen: boolean) => {
      setIsDrawerOpen(isDrawerOpen)
      setIsStoppedWatching(isDrawerOpen)
    },
  })
  const navigate = useNavigate()

  const handlePostCreate = () => {
    navigate("/posts/create")
  }
  const handlePostSearch = () => {
    setIsOpen(true)
    setType("all")
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case "posts":
        return <PostList location={currentLocation} />
      default:
        return <div className="h-[75dvh]"></div>
    }
  }

  return (
    <div className="relative h-[calc(100dvh-var(--header-height)-var(--navigation-bar-height))]">
      <MapController
        isLocationPermissionGranted={isLocationPermissionGranted}
        location={currentLocation}
        lastFetchedLocation={lastFetchedLocation}
      />

      <PostCreateButton onClick={handlePostCreate} />
      <PostSearchButton onClick={handlePostSearch} />

      <EmDrawer open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <div>
          <Tabs
            tabs={tabs}
            activeTab={currentTab}
            onTabChange={(tabValue: string) =>
              setCurrentTab(tabValue as "posts" | "playlist")
            }
          />
          {renderTabContent()}
        </div>
      </EmDrawer>
    </div>
  )
}

export default HomePage
