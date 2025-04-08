import Button from "@/components/Button/Button"
import { Link } from "react-router-dom"

const EmotionStatisticsEmpty = () => {
  return (
    <div className="w-full flex items-center flex-col gap-4 justify-center">
      <p className="text-sm text-gray-500">최근 기록이 없습니다.</p>
      <Link to="/posts/create" viewTransition>
        <Button className="hover" variant="outline">
          마음 기록하기
        </Button>
      </Link>
    </div>
  )
}
export default EmotionStatisticsEmpty
