import Button from "@/components/Button/Button"
import { LocateFixedIcon } from "lucide-react"

interface LocationFixButtonProps {
  onClick: () => void
}

const LocationFixButton = ({ onClick }: LocationFixButtonProps) => {
  return (
    <Button
      variant="outline"
      shape="circle"
      className="absolute z-10 p-2 shadow-md bottom-24 right-4 hover:bg-em-gray-md"
      onClick={onClick}>
      <LocateFixedIcon />
    </Button>
  )
}

export default LocationFixButton
