import { useQuery } from "@tanstack/react-query"
import { fetchPointList } from "../api/postApi"
import { PointList, PointListRequest } from "../types/post"

const usePoints = ({ lng, lat, rad = 500 }: PointListRequest) => {
  const { data, isLoading, isError } = useQuery<PointList>({
    queryKey: ["points", lng, lat, rad],
    queryFn: () => fetchPointList({ lat, lng, rad }),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  })

  return { pointData: data, isPointLoading: isLoading, isPointError: isError }
}

export default usePoints
