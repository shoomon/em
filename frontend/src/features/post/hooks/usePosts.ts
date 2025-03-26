import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { fetchPostList } from "../api/postApi"
import { PostListRequest } from "../types/post"

const usePosts = (props: PostListRequest) => {
  const queryFn = async (pageParam: any) => {
    try {
      const response = await fetchPostList({
        ...props,
        postId: pageParam.lastId,
        dist: pageParam.lastDist,
        emoCnt: pageParam.lastCnt,
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const { data, isLoading, observerRef, isError, isFetchingNextPage } = useInfiniteScroll({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => queryFn(pageParam),
    initialPageParam: {
      lastId: 0,
      lastDist: 0,
      lastCnt: 0,
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta?.hasNext) {
        return {
          lastId: lastPage.meta.lastId ?? undefined,
          lastDist: lastPage.meta.lastDist ?? undefined,
          lastCnt: lastPage.meta.lastCnt ?? undefined,
        }
      }

      return undefined
    },
    refetchOnWindowFocus: false,
  })

  return {
    data,
    isLoading,
    isError,
    observerRef,
    isFetchingNextPage,
  }
}

export default usePosts
