import logo from "@/assets/em_logo_simple.svg"
import { cn } from "@/utils/cn"

interface EmLoadingProps {
  description?: string
  className?: string
}

const EmLoading = ({ description, className }: EmLoadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full h-full",
        className,
      )}>
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
        <img src={logo} alt="로고" className="w-24 animate-bounce" />
        {description && <div className="text-base">{description}</div>}
      </div>
    </div>
  )
}
export default EmLoading
