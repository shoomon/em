import Button from "@/components/Button/Button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { ActionDispatch } from "react"

interface MonthNavigatorProps {
  date: Date
  onDateChange: ActionDispatch<
    [
      action: {
        type: "increase" | "decrease"
      },
    ]
  >
}

const MonthNavigator = ({ date, onDateChange }: MonthNavigatorProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      <Button
        type="button"
        variant="ghost"
        onClick={() => onDateChange({ type: "decrease" })}>
        <ChevronLeftIcon className="size-5" />
      </Button>
      <span className="text-base font-medium">
        {date.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
        })}
      </span>
      <Button
        type="button"
        variant="ghost"
        onClick={() => onDateChange({ type: "increase" })}>
        <ChevronRightIcon className="size-5" />
      </Button>
    </div>
  )
}
export default MonthNavigator
