import Button from "@/components/Button/Button"
import { cn } from "@/utils/cn"
import { LocateFixedIcon } from "lucide-react"

interface LocationFixButtonProps {
  className?: string
  onClick: () => void
}

const LocationFixButton = ({ className, onClick }: LocationFixButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      shape="circle"
      className={cn(
        "absolute z-10 p-2 shadow-md bottom-24 right-4 hover:bg-em-gray-md",
        className,
      )}
      onClick={onClick}>
      <LocateFixedIcon className="size-5" />
    </Button>
  )
}

export default LocationFixButton
