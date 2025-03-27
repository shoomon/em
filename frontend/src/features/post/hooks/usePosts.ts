import { LatLng } from "@/features/map/types/map"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import usePostStore from "@/store/usePostStore"
import { useSearchParams } from "react-router-dom"
import { fetchPostClusteredList, fetchPostList } from "../api/postApi"

interface UsePostsProps {
  location: LatLng
}

const usePosts = ({ location }: UsePostsProps) => {
  const [searchParams] = useSearchParams()
  const sortType = searchParams.get("sort") || "latest"
  const clusterGrid = usePostStore((state) => state.clusterGrid)

  const queryPost = async (pageParam: any) => {
    try {
      const response = await fetchPostList({
        ...location,
        postId: pageParam.lastId,
        dist: pageParam.lastDist,
        emoCnt: pageParam.lastCnt,
        sort: sortType,
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const queryClusteredPost = async (pageParam: any) => {
    try {
      const response = await fetchPostClusteredList({
        minLat: clusterGrid![0].lat,
        minLng: clusterGrid![0].lng,
        maxLat: clusterGrid![1].lat,
        maxLng: clusterGrid![1].lat,
        postId: pageParam.lastId,
        dist: pageParam.lastDist,
        emoCnt: pageParam.lastCnt,
        sort: sortType,
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const {
    data: postsData,
    isLoading: isPostsLoading,
    isFetchingNextPage: isPostsFetchingNextPage,
    observerRef: postsObserverRef,
  } = useInfiniteScroll({
    queryKey: ["posts", sortType],
    queryFn: ({ pageParam }) => queryPost(pageParam),
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
    enabled: !clusterGrid,
    refetchOnWindowFocus: false,
  })

  const {
    data: clusteredPostsData,
    isLoading: isClusteredPostsLoading,
    isFetchingNextPage: isClusteredPostsFetchingNextPage,
    observerRef: clusteredPostsObserverRef,
  } = useInfiniteScroll({
    queryKey: ["clusteredPost", sortType],
    queryFn: ({ pageParam }) => queryClusteredPost(pageParam),
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
    enabled: !!clusterGrid,
    refetchOnWindowFocus: false,
  })

  if (clusterGrid) {
    return {
      data: clusteredPostsData,
      isLoading: isClusteredPostsLoading,
      isFetchingNextPage: isClusteredPostsFetchingNextPage,
      observerRef: clusteredPostsObserverRef,
    }
  } else {
    return {
      data: postsData,
      isLoading: isPostsLoading,
      isFetchingNextPage: isPostsFetchingNextPage,
      observerRef: postsObserverRef,
    }
  }
}

export default usePosts
