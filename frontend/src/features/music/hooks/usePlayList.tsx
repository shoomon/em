import { LatLng } from "@/features/map/types/map"
import { fetchPostPlaylist } from "@/features/post/api/postApi"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"

interface UsePlayListProps {
  location: LatLng
}

const usePlayList = ({ location }: UsePlayListProps) => {
  const fetchFn = async (pageParam: any) => {
    const response = await fetchPostPlaylist({
      ...location,
      lastMusicId: pageParam.lastMusicId,
      lastMusicCount: pageParam.lastMusicCount,
    })
    return response
  }

  const { data, isPending, isFetchingNextPage, observerRef } =
    useInfiniteScroll({
      queryKey: ["playlist", location],
      queryFn: ({ pageParam }) => fetchFn(pageParam),
      initialPageParam: {
        lastMusicId: undefined,
        lastMusicCount: undefined,
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.meta.hasNext) {
          return {
            lastMusicId: lastPage.meta.lastMusicId ?? undefined,
            lastMusicCount: lastPage.meta.lastMusicCount ?? undefined,
          }
        }

        return undefined
      },
    })

  return { data, isPending, isFetchingNextPage, observerRef }
}

export default usePlayList
