import { MapPinIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import { LatLng } from "../types/map"

interface AddressDisplayProps {
  location: LatLng
}

const AddressDisplay = ({ location }: AddressDisplayProps) => {
  const [address, setAddress] = useState("")

  useEffect(() => {
    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(location),
      },
      (_, response: naver.maps.Service.ReverseGeocodeResponse) => {
        setAddress(response.v2.address.jibunAddress)
      },
    )
  }, [location])

  return (
    <div className="absolute top-0 left-0 z-10 flex items-center w-full gap-2 p-3 bg-gradient-to-b from-em-white via-em-white/80 to-em-white/10">
      <MapPinIcon className="stroke-red-500" />
      <p className="font-semibold">{address}</p>
    </div>
  )
}

// location이 바뀔 때만 리렌더링하여 ReverseGeocoing API call을 줄임
export default React.memo(AddressDisplay)
