import EmDrawer from "@/components/EmDrawer/EmDrawer"
import Tabs from "@/components/Tabs/Tabs"
import MapController from "@/features/map/components/MapController"
import PlayList from "@/features/music/components/PlayList"
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
  const navigate = useNavigate()

  useDrawer({
    drawerKey: "home",
    isOpen: isDrawerOpen,
    setIsOpen: (isDrawerOpen: boolean) => {
      setIsDrawerOpen(isDrawerOpen)
      setIsStoppedWatching(isDrawerOpen)
    },
  })

  const handlePostCreate = () => {
    navigate("/posts/create")
  }
  const handlePostSearch = () => {
    setIsDrawerOpen(true)
    setIsStoppedWatching(true)
    setType("all")
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case "posts":
        return <PostList location={currentLocation} />
      case "playlist":
        return <PlayList location={currentLocation} />
    }
  }

  return (
    <div className="relative h-[calc(100dvh-var(--header-height)-var(--navigation-bar-height))]">
      <MapController
        isLocationPermissionGranted={isLocationPermissionGranted}
        location={currentLocation}
        lastFetchedLocation={lastFetchedLocation}
        setIsStoppedWatching={setIsStoppedWatching}
      />

      <PostCreateButton onClick={handlePostCreate} />
      <PostSearchButton onClick={handlePostSearch} />

      <EmDrawer
        open={isDrawerOpen}
        onOpenChange={() => {
          setIsDrawerOpen(!isDrawerOpen)
          setIsStoppedWatching(!isDrawerOpen)
        }}>
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
