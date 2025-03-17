import useMap from "@/hooks/map/useMap"
import { LocateFixedIcon } from "lucide-react"
import { useRef } from "react"

interface MapViewerProps {
  location?: { lat: number; lng: number }
  className?: string
}

const MapViewer = ({
  location = { lat: 37.501286, lng: 127.0396029 },
  className,
}: MapViewerProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { map } = useMap({ initLocation: location, mapRef })

  const focusOnMarker = () => {
    map.current?.setCenter(new window.naver.maps.LatLng(location.lat, location.lng))
  }

  return (
    <div ref={mapRef} className={className}>
      <button
        className="absolute z-10 p-2 bg-white border rounded-full shadow-md cursor-pointer bottom-24 right-4 border-neutral-200"
        onClick={focusOnMarker}>
        <LocateFixedIcon />
      </button>
    </div>
  )
}

export default MapViewer
