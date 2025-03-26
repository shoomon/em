import EmDrawer from "@/components/drawer/EmDrawer"
import Tabs from "@/components/Tabs/Tabs"
import AddressDisplay from "@/features/map/components/AddressDisplay"
import LocationFixButton from "@/features/map/components/LocatonFixButton"
import MapViewer from "@/features/map/components/MapViewer"
import ClusteredPostList from "@/features/post/components/ClusteredPostList"
import PostCreateButton from "@/features/post/components/PostCreateButton"
import PostList from "@/features/post/components/PostList"
import PostRefetchButton from "@/features/post/components/PostRefetchButton"
import PostSearchButton from "@/features/post/components/PostSearchButton"
import usePoints from "@/features/post/hooks/usePoints"
import useDrawer from "@/hooks/useDrawer"
import useGps from "@/hooks/useGps"
import usePostStore from "@/store/usePostStore"
import { useEffect, useRef, useState } from "react"

const tabs = [
  { value: "posts", label: "이곳에 남긴 글" },
  { value: "playlist", label: "이곳의 플레이리스트" },
]

const HomePage = () => {
  const locationPermissionRef = useRef(false)
  const { currentLocation, lastFetchedLocation } = useGps()
  const [currentTab, setCurrentTab] = useState<"posts" | "playlist">("posts")
  const { isOpen, setIsOpen } = useDrawer("home")
  const { pointData } = usePoints({ ...currentLocation })
  const postsType = usePostStore((state) => state.postsType)

  useEffect(() => {
    const permissionStatus = sessionStorage.getItem("location-permission")
    locationPermissionRef.current = permissionStatus !== "denied"
  }, [])

  const renderTabContent = () => {
    switch (currentTab) {
      case "posts":
        switch (postsType) {
          case "normal":
            return <PostList location={currentLocation} />
          case "clustered":
            setIsOpen(true)
            return <ClusteredPostList />
        }
      default:
        return <div className="h-[75dvh]"></div>
    }
  }

  return (
    <div className="relative h-[calc(100dvh-var(--header-height)-var(--navigation-bar-height))]">
      <AddressDisplay location={lastFetchedLocation} />
      <PostRefetchButton onClick={() => {}} />
      <MapViewer
        className="h-full"
        isDenied={!locationPermissionRef.current}
        location={currentLocation}
        points={pointData?.pointList || []}>
        {(focusOnMarker) => <LocationFixButton onClick={focusOnMarker} />}
      </MapViewer>
      <PostCreateButton onClick={() => {}} />
      <PostSearchButton onClick={() => setIsOpen(true)} />

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
