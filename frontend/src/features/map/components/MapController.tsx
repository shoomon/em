import PostRefetchButton from "@/features/post/components/PointRefetchButton"
import usePoints from "@/features/post/hooks/usePoints"
import React, { useEffect, useRef, useState } from "react"
import { LatLng } from "../types/map"
import AddressDisplay from "./AddressDisplay"
import LocationFixButton from "./LocatonFixButton"
import MapViewer from "./MapViewer"

interface MapControllerProps {
  isLocationPermissionGranted: boolean
  location: LatLng
  lastFetchedLocation: LatLng
}

const MapController = ({
  isLocationPermissionGranted,
  location,
  lastFetchedLocation,
}: MapControllerProps) => {
  const [isRefetching, setIsRefetching] = useState(false)
  const refetchingRef = useRef<NodeJS.Timeout | null>(null)
  const { data, refetch } = usePoints({
    isLocationPermissionGranted,
    pointListRequest: location,
  })

  useEffect(() => {
    return () => {
      if (refetchingRef.current) {
        clearTimeout(refetchingRef.current)
      }
    }
  }, [])

  const handleRefetchButton = () => {
    if (isRefetching) {
      return
    }

    setIsRefetching(true)
    refetch()
    refetchingRef.current = setTimeout(() => {
      setIsRefetching(false)
    }, 5_000)
  }

  return (
    <>
      <AddressDisplay location={lastFetchedLocation} />
      <PostRefetchButton
        disabled={isRefetching}
        onClick={handleRefetchButton}
      />
      <MapViewer
        className="h-full"
        isLocationPermissionGranted={isLocationPermissionGranted}
        location={location}
        points={data?.pointList || []}>
        {(focusOnMarker) => <LocationFixButton onClick={focusOnMarker} />}
      </MapViewer>
    </>
  )
}

export default React.memo(MapController)
