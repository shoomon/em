import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { fetchPostClusteredList } from "../api/postApi"
import { ClusteredPostListRequest } from "../types/post"

const useClusteredPosts = (props: ClusteredPostListRequest) => {
  const queryFn = async (pageParam: number) => {
    try {
      const response = await fetchPostClusteredList({
        ...props,
        postId: pageParam,
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const { data, isLoading, observerRef, isError, isFetchingNextPage } = useInfiniteScroll({
    queryKey: ["clustered"],
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

export default useClusteredPosts
