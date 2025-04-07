import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import { InfoIcon } from "lucide-react"

const RecommendInfoPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <InfoIcon className="cursor-pointer size-4 xs:size-5 stroke-em-gray" />
      </PopoverTrigger>
      <PopoverContent align="end" alignOffset={5} sideOffset={-5}>
        <div className="px-3 py-2 border rounded-md shadow-md bg-em-white border-em-gray text-em-black/50">
          서비스를 많이 이용할수록 추천 결과가 더 좋아져요!
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default RecommendInfoPopover
