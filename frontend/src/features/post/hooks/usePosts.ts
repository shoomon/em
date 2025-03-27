import { LatLng } from "@/features/map/types/map"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import usePostStore from "@/store/usePostStore"
import { useSearchParams } from "react-router-dom"
import { fetchPostList } from "../api/postApi"

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
        minLat: clusterGrid ? clusterGrid[0].lat : undefined,
        minLng: clusterGrid ? clusterGrid[0].lng : undefined,
        maxLat: clusterGrid ? clusterGrid[1].lat : undefined,
        maxLng: clusterGrid ? clusterGrid[1].lng : undefined,
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

  const { data, isLoading, isFetchingNextPage, observerRef } =
    useInfiniteScroll({
      queryKey: ["posts", location, clusterGrid, sortType],
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
      refetchOnWindowFocus: false,
    })

  return {
    data,
    isLoading,
    isFetchingNextPage,
    observerRef,
  }
}

export default usePosts
