import PostRefetchButton from "@/features/post/components/PointRefetchButton"
import usePoints from "@/features/post/hooks/usePoints"
import React, { Dispatch, SetStateAction } from "react"
import { LatLng } from "../types/map"
import AddressDisplay from "./AddressDisplay"
import LocationFixButton from "./LocatonFixButton"
import MapViewer from "./MapViewer"

interface MapControllerProps {
  isLocationPermissionGranted: boolean
  location: LatLng
  lastFetchedLocation: LatLng
  setIsStoppedWatching: Dispatch<SetStateAction<boolean>>
}

const MapController = ({
  isLocationPermissionGranted,
  location,
  lastFetchedLocation,
  setIsStoppedWatching,
}: MapControllerProps) => {
  const { data, refetch } = usePoints({
    isLocationPermissionGranted,
    pointListRequest: lastFetchedLocation,
  })

  return (
    <>
      <AddressDisplay location={lastFetchedLocation} />
      <PostRefetchButton onClick={() => refetch()} />
      <MapViewer
        className="h-full"
        isLocationPermissionGranted={isLocationPermissionGranted}
        location={location}
        points={data?.pointList || []}
        setIsStoppedWatching={setIsStoppedWatching}>
        {(focusOnMarker) => <LocationFixButton onClick={focusOnMarker} />}
      </MapViewer>
    </>
  )
}

export default React.memo(MapController)
