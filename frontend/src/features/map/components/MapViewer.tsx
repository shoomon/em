import useMap from "@/features/map/hooks/useMap"
import { ReactNode, useRef } from "react"

interface MapViewerProps {
  location?: { lat: number; lng: number }
  className?: string
  children?: (focusOnMarker: () => void) => ReactNode
}

const MapViewer = ({
  location = { lat: 37.501286, lng: 127.0396029 },
  className,
  children,
}: MapViewerProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { map } = useMap({ initLocation: location, mapRef })

  const focusOnMarker = () => {
    map.current?.setCenter(new window.naver.maps.LatLng(location.lat, location.lng))
  }

  return (
    <div ref={mapRef} className={className}>
      {children?.(focusOnMarker)}
    </div>
  )
}

export default MapViewer
