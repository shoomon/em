import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { fetchPostList } from "../api/postApi"
import { PostListRequest } from "../types/post"

const usePosts = (props: PostListRequest) => {
  const queryFn = async (pageParam: number) => {
    try {
      const response = await fetchPostList({
        ...props,
        postId: pageParam,
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const { data, isLoading, observerRef, isError, isFetchingNextPage } = useInfiniteScroll({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => queryFn(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.meta?.hasNext ? lastPage.meta.lastId : undefined),
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
