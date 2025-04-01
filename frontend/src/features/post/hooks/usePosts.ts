import { LatLng } from "@/features/map/types/map"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import usePostStore from "@/store/usePostStore"
import { useSearchParams } from "react-router-dom"
import { fetchPostList } from "../api/postApi"
import { PostListType } from "../types/post"

interface UsePostsProps {
  type: PostListType
  location: LatLng
}

const usePosts = ({ type, location }: UsePostsProps) => {
  const [searchParams] = useSearchParams()
  const sortType = searchParams.get("sort") || "latest"
  const clusterGrid = usePostStore((state) => state.clusterGrid)

  const fetchFn = async (pageParam: any) => {
    const isCluster = type === "cluster"

    try {
      const response = await fetchPostList({
        ...location,
        minLat: isCluster ? clusterGrid[0].lat : undefined,
        minLng: isCluster ? clusterGrid[0].lng : undefined,
        maxLat: isCluster ? clusterGrid[1].lat : undefined,
        maxLng: isCluster ? clusterGrid[1].lng : undefined,
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

  const { data, isLoading, isPending, isFetchingNextPage, observerRef } =
    useInfiniteScroll({
      queryKey: ["posts", location, type, clusterGrid, sortType],
      queryFn: ({ pageParam }) => fetchFn(pageParam),
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
      enabled: type !== "marker",
    })

  return {
    data,
    isLoading,
    isPending,
    isFetchingNextPage,
    observerRef,
  }
}

export default usePosts
