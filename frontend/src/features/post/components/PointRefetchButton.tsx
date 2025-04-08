import Button from "@/components/Button/Button"
import { RotateCwIcon } from "lucide-react"
import { useEffect, useState } from "react"

interface PointRetetchButtonProps {
  onClick: () => void
}

const PointRefetchButton = ({ onClick }: PointRetetchButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (!isLoading) {
      return
    }

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsLoading(false)
          return 0
        }

        return prev - 1
      })
    }, 1_000)
    return () => clearInterval(timer)
  }, [isLoading])

  const handleClick = () => {
    setIsLoading(true)
    setCount(5)
    onClick()
  }

  return (
    <Button
      disabled={isLoading}
      onClick={handleClick}
      variant={"outline"}
      shape="circle"
      className="absolute z-10 p-2 shadow-md bottom-8 left-4 hover:bg-em-gray-md">
      <RotateCwIcon className="size-5" />

      {isLoading && (
        <div className="absolute top-0 left-0 flex items-center justify-center font-bold rounded-full size-9 bg-em-black/60 text-em-white">
          {count}
        </div>
      )}
    </Button>
  )
}

export default PointRefetchButton
