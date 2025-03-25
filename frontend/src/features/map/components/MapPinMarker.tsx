import type { FC } from "react"

interface MapPinMarkerProps {}

const MapPinMarker: FC<MapPinMarkerProps> = ({}) => {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-em-black text-xs text-white px-3 py-2 rounded-full">내 위치</span>
      <span className="w-[2px] h-3 bg-em-black"></span>
    </div>
  )
}
export default MapPinMarker
