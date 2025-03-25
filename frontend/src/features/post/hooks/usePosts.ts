import { useInfiniteQuery } from "@tanstack/react-query"
import { PostInfiniteData } from "../types/post"
import { fetchPostList } from "../api/postApi"

interface UsePostsProps {
  location: { lat: number; lng: number }
}

const usePosts = ({ location }: UsePostsProps) => {
  const { data, isLoading, isError } = useInfiniteQuery<PostInfiniteData>({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      return await fetchPostList({
        lat: location.lat,
        lng: location.lng,
        postId: pageParam as number,
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.meta?.hasNext ? lastPage.meta.lastId : undefined),
    refetchOnWindowFocus: false,
  })

  return { posts: data, isPostLoading: isLoading, isPostError: isError }
}

export default usePosts
