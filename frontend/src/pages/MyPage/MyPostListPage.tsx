import MyPostList from "@/features/history/components/MyPostList"
import { useMyPostsByDate } from "@/features/history/hooks/useMyPostsByDate"
import { formatDateToYMD } from "@/features/history/utils/getCalendarColor"
import useStackLayoutStore from "@/store/useStackLayoutStore"
import { useEffect } from "react"

const MyPostListPage = () => {
  const setTitle = useStackLayoutStore((state) => state.setTitle)
  const rawDate = sessionStorage.getItem("selectedDate")
  const selectedDate = rawDate ? new Date(rawDate) : null

  const formattedDate = selectedDate ? formatDateToYMD(selectedDate) : null

  useEffect(() => {
    setTitle(formattedDate as string)
  }, [])

  if (!formattedDate) {
    return (
      <div className="text-center py-10 text-em-black">
        선택된 날짜가 없습니다.
      </div>
    )
  }

  const { postList, isLoading, mutation } = useMyPostsByDate(formattedDate)

  return (
    <div className="w-full min-h-[calc(100dvh-var(--header-height)))] ">
      {isLoading ? (
        <div className="h-40 bg-em-gray-md animate-pulse" />
      ) : (
        <MyPostList postList={postList} onDeletePost={mutation.mutate} />
      )}
    </div>
  )
}

export default MyPostListPage
