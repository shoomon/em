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
    location: "서울 강남구 테헤란로 212",
    lat: 37.501286,
    lng: 127.0396029,
    date: "5분 전",
    author: "걱정하는 강아지",
    content:
      "오늘 SSAFY 14기 면접 보러가는데 엄청 떨려요.\n잘 할 수 있겠죠ㅠㅠ?\n면접 보시는 분들 14기 돼서 꼭 만나요.",
    emoji: { happy: 1, sad: 20, love: 213, angry: 2, confident: 234 },
  },
  {
    id: 2,
    location: "서울 강남구 테헤란로 213",
    lat: 37.5013068,
    lng: 127.0371728,
    date: "13분 전",
    author: "울먹이는 바다코끼리",
    content: "ㅠㅠ",
    emoji: { happy: 1, sad: 20, love: 213, angry: 2, confident: 234 },
  },
  {
    id: 3,
    location: "서울 강남구 테헤란로 214",
    lat: 37.5033214,
    lng: 127.0384099,
    date: "1시간 전",
    author: "기뻐하는 판다곰",
    content: "노브랜드 버거 먹는 중 꿀맛~!",
    emoji: { happy: 1, sad: 20, love: 213, angry: 2, confident: 234 },
  },
  {
    id: 4,
    location: "서울 강남구 테헤란로 214",
    lat: 37.5031847,
    lng: 127.0392911,
    date: "3시간 전",
    author: "기뻐하는 판다곰",
    content: "인생 쓰다...내가 지금 마시는 바나프레소 에스프레소처럼",
    emoji: { happy: 1, sad: 20, love: 213, angry: 2, confident: 234 },
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
        return <PostList list={dummyData} />
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
