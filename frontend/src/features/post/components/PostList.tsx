import { LatLng } from "@/features/map/types/map"
import usePostStore from "@/store/usePostStore"
import React from "react"
import usePost from "../hooks/usePost"
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
  location: LatLng
}

const PostList = ({ location }: PostListProps) => {
  const type = usePostStore((state) => state.type)
  const { data: postData, isLoading: isPostLoading } = usePost({ type })
  const {
    data: postListData,
    isLoading: isPostListLoading,
    isFetchingNextPage,
    observerRef,
  } = usePosts({
    type,
    location,
  })

  return (
    <div className="flex flex-col overflow-y-auto h-[75dvh]">
      <SortTypeSelector contents={sortTypeData} />

      <div className="flex flex-col flex-1 gap-4 bg-em-gray-sm">
        {type === "marker" ? (
          isPostLoading ? (
            <div className="h-40 bg-em-gray-md animate-pulse" />
          ) : (
            <PostItem {...postData!} />
          )
        ) : isPostListLoading ? (
          <div className="h-40 bg-em-gray-md animate-pulse" />
        ) : (
          <>
            {postListData?.pages.map((page: any) =>
              page.postList.map((item: Post) => (
                <PostItem key={item.postId} {...item} />
              )),
            )}

            {isFetchingNextPage ? (
              <div className="h-40 bg-em-gray-md animate-pulse" />
            ) : (
              <div ref={observerRef} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default React.memo(PostList)
