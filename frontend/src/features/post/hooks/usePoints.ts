import { useQuery } from "@tanstack/react-query"
import { fetchPostList } from "../api/postApi"

interface UsePointsProps {
  location: { lat: number; lng: number }
}

const usePoints = ({ location }: UsePointsProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["points"],
    queryFn: () => fetchPostList({ lat: location.lat, lng: location.lng }),
    staleTime: 5 * 1000 * 60,
    refetchOnWindowFocus: false,
  })

  return { points: data, isPointLoading: isLoading, isPointError: isError }
}

export default usePoints
