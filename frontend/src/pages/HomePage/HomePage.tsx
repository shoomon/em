import EmDrawer from "@/components/drawer/EmDrawer"
import Tabs from "@/components/Tabs/Tabs"
import AddressDisplay from "@/features/map/components/AddressDisplay"
import LocationFixButton from "@/features/map/components/LocatonFixButton"
import MapViewer from "@/features/map/components/MapViewer"
import PostCreateButton from "@/features/post/components/PostCreateButton"
import PostList from "@/features/post/components/PostList"
import PostRefetchButton from "@/features/post/components/PostRefetchButton"
import PostSearchButton from "@/features/post/components/PostSearchButton"
import usePoints from "@/features/post/hooks/usePoints"
import useDrawer from "@/hooks/useDrawer"
import useGps from "@/hooks/useGps"
import useLocationStore from "@/store/useLocationStore"
import usePostStore from "@/store/usePostStore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const tabs = [
  { value: "posts", label: "이곳에 남긴 글" },
  { value: "playlist", label: "이곳의 플레이리스트" },
]

const HomePage = () => {
  const { currentLocation, lastFetchedLocation } = useGps()
  const [currentTab, setCurrentTab] = useState<"posts" | "playlist">("posts")
  const { pointData } = usePoints({ ...currentLocation })
  const isLocationPermissionDenied = useLocationStore(
    (state) => state.isPermissionDenied,
  )

  const { isVisible, setIsVisible, setType } = usePostStore()
  const { isOpen, setIsOpen } = useDrawer({
    drawerKey: "home",
    isOpen: isVisible,
    setIsOpen: setIsVisible,
  })
  const navigate = useNavigate()

  const renderTabContent = () => {
    switch (currentTab) {
      case "posts":
        return <PostList location={currentLocation} />
      default:
        return <div className="h-[75dvh]"></div>
    }
  }

  const onClickRefetchButton = () => {
    //
  }
  const onClickCreateButton = () => {
    navigate("/posts/create")
  }
  const onClickSearchButton = () => {
    setIsOpen(true)
    setClusterGrid(null)
  }

  return (
    <div className="relative h-[calc(100dvh-var(--header-height)-var(--navigation-bar-height))]">
      <AddressDisplay location={lastFetchedLocation} />
      <PostRefetchButton onClick={onClickRefetchButton} />
      <MapViewer
        className="h-full"
        isDenied={isLocationPermissionDenied}
        location={currentLocation}
        points={pointData?.pointList || []}>
        {(focusOnMarker) => <LocationFixButton onClick={focusOnMarker} />}
      </MapViewer>
      <PostCreateButton onClick={onClickCreateButton} />
      <PostSearchButton onClick={onClickSearchButton} />

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
