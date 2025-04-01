import emptyImage from "@/assets/em_bear.png"
import { LatLng } from "@/features/map/types/map"
import usePost from "@/features/post//hooks/usePost"
import usePosts from "@/features/post//hooks/usePosts"
import PostItem from "@/features/post/components/PostItem"
import PostSkeleton from "@/features/post/components/PostSkeleton"
import SortTypeSelector from "@/features/post/components/SortTypeSelector"
import { Post } from "@/features/post/types/post"
import usePostStore from "@/store/usePostStore"
import React from "react"

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

  const isEmpty =
    type === "marker"
      ? !postData
      : !postListData ||
        postListData.pages.every((page: any) => page.postList.length === 0)

  return (
    <div className="flex flex-col overflow-y-auto h-[75dvh]">
      <SortTypeSelector contents={sortTypeData} />

      {isEmpty ? (
        <div className="relative h-full bg-em-white">
          <div className="absolute flex flex-col -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <p className="text-[clamp(3rem,4vw,6rem)] font-bold text-em-gray ">
              텅..
            </p>
            <p className="text-[clamp(0.8rem,4vw,1.2rem)] text-em-gray ">
              이곳에는 메시지가 없어요
              <br />
              가장 먼저 메시지를 남겨보세요!
            </p>

            <img src={emptyImage} alt="" className="self-end w-1/2 my-4" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-1 gap-4 bg-em-gray-sm">
          {type === "marker" ? (
            isPostLoading ? (
              <PostSkeleton />
            ) : (
              <PostItem {...postData!} />
            )
          ) : isPostListLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))
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
      )}
    </div>
  )
}

export default React.memo(PostList)
