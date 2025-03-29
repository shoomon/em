import { useQuery } from "@tanstack/react-query"
import { fetchPointList } from "../api/postApi"
import { PointList, PointListRequest } from "../types/post"

interface UsePointsProps {
  isLocationPermissionGranted: boolean
  pointListRequest: PointListRequest
}

const usePoints = ({
  isLocationPermissionGranted,
  pointListRequest,
}: UsePointsProps) => {
  const { data, refetch } = useQuery<PointList>({
    queryKey: [
      "points",
      pointListRequest.lng,
      pointListRequest.lat,
      pointListRequest.rad,
    ],
    queryFn: () => fetchPointList({ ...pointListRequest }),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    enabled: isLocationPermissionGranted,
  })

  return { data, refetch }
}

export default usePoints
