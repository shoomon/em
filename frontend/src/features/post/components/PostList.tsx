import { useSearchParams } from "react-router-dom"
import { Post } from "../types/post"
import usePosts from "./../hooks/usePosts"
import PostItem from "./PostItem"
import SortTypeSelector from "./SortTypeSelector"

const sortTypeData = [
  { label: "최신순", sortType: "latest" },
  { label: "거리순", sortType: "distance" },
  { label: "공감순", sortType: "popular" },
]

interface PostListProps {
  location: { lat: number; lng: number }
}

const PostList = ({ location }: PostListProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, isLoading, isFetchingNextPage, observerRef } = usePosts({
    ...location,
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
            <div ref={observerRef} className="h-1" />
          )}
        </>
      )}
    </div>
  )
}

export default PostList
