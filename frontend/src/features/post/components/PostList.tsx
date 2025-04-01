import { LatLng } from "@/features/map/types/map"
import usePost from "@/features/post//hooks/usePost"
import usePosts from "@/features/post//hooks/usePosts"
import PostItem from "@/features/post/components/PostItem"
import PostSkeleton from "@/features/post/components/PostSkeleton"
import SortTypeSelector from "@/features/post/components/SortTypeSelector"
import { Post } from "@/features/post/types/post"
import usePostStore from "@/store/usePostStore"
import React from "react"
import PostEmpty from "./PostEmpty"

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
  const { data: postData, isPending: isPostPending } = usePost({ type })
  const {
    data: postListData,
    isPending: isPostListPending,
    isFetchingNextPage,
    observerRef,
  } = usePosts({
    type,
    location,
  })

  const isEmpty =
    type === "marker"
      ? !postData
      : !postListData ||
        postListData.pages.every((page: any) => page.postList.length === 0)

  return (
    <div className="flex flex-col overflow-y-auto h-[75dvh]">
      <SortTypeSelector contents={sortTypeData} />

      <div className="flex flex-col flex-1 gap-4 bg-em-gray-sm">
        {type === "marker" ? (
          isPostPending ? (
            <PostSkeleton />
          ) : isEmpty ? (
            <PostEmpty />
          ) : (
            <PostItem {...postData!} />
          )
        ) : isPostListPending ? (
          Array.from({ length: 3 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))
        ) : isEmpty ? (
          <PostEmpty />
        ) : (
          <>
            {postListData?.pages.map((page: any) =>
              page.postList.map((item: Post) => (
                <PostItem key={item.postId} {...item} />
              )),
            )}

            {isFetchingNextPage ? (
              Array.from({ length: 3 }).map((_, index) => (
                <PostSkeleton key={index} />
              ))
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
