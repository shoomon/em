import EmLoading from "@/components/EmLoading/EmLoading"

const RecommendPage = () => {
  return (
    <div className="h-[calc(100dvh-var(--navigation-bar-height)-var(--header-height))] ">
      <div className="h-full flex flex-col justify-center items-center">
        <EmLoading description="추천 기능이 들어갈 페이지" />
      </div>
    </div>
  )
}
export default RecommendPage
