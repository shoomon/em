import usePostStore from "@/store/usePostStore"
import { useSearchParams } from "react-router-dom"
import useClusteredPosts from "../hooks/useClusteredPosts"
import { Post } from "../types/post"
import PostItem from "./PostItem"
import SortTypeSelector from "./SortTypeSelector"

const sortTypeData = [
  { label: "최신순", sortType: "latest" },
  { label: "거리순", sortType: "distance" },
  { label: "공감순", sortType: "popular" },
]

const ClusteredPostList = () => {
  const [searchParams] = useSearchParams()
  const { sw, ne } = usePostStore()

  const { data, isLoading, isFetchingNextPage, observerRef } = useClusteredPosts({
    minLng: sw.lng,
    minLat: sw.lat,
    maxLng: ne.lng,
    maxLat: ne.lat,
    sort: searchParams.get("sort") || "latest",
  })

  return (
    <div className="overflow-y-auto h-[75dvh]">
      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        <>
          <SortTypeSelector contents={sortTypeData} />
          <div className="flex flex-col gap-4 bg-em-gray-sm">
            {data?.pages.map((page: any) =>
              page.postList.map((item: Post) => <PostItem key={item.id} {...item} />),
            )}
          </div>
          {isFetchingNextPage ? (
            <div className="bg-em-gray-md animate-pulse h-40" />
          ) : (
            <div ref={observerRef} className="h-1 bg-red-300" />
          )}
        </>
      )}
    </div>
  )
}

export default ClusteredPostList
