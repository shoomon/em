import PostItem from "./PostItem"
import SortTypeSelector from "./SortTypeSelector"

const PostList = () => {
  const sortTypeData = [
    { label: "최신순", sortType: "latest" },
    { label: "거리순", sortType: "distance" },
    { label: "공감순", sortType: "like" },
  ]

  const dummyData = [
    {
      id: 1,
      location: "서울 강남구 테헤란로 212",
      date: "5분 전",
      author: "걱정하는 강아지",
      content:
        "오늘 SSAFY 14기 면접 보러가는데 엄청 떨려요.\n잘 할 수 있겠죠ㅠㅠ?\n면접 보시는 분들 14기 돼서 꼭 만나요.",
      emoji: { happy: 1, sad: 20, love: 213, angry: 2, confident: 234 },
    },
    {
      id: 2,
      location: "서울 강남구 테헤란로 212",
      date: "13분 전",
      author: "울먹이는 바다코끼리",
      content: "ㅠㅠ",
      emoji: { happy: 1, sad: 20, love: 213, angry: 2, confident: 234 },
    },
    {
      id: 3,
      location: "서울 강남구 테헤란로 212",
      date: "1시간 전",
      author: "기뻐하는 판다곰",
      content: "우와아아아아아아아아아아~!",
      emoji: { happy: 1, sad: 20, love: 213, angry: 2, confident: 234 },
    },
  ]

  return (
    <div className="h-[600px] overflow-y-auto">
      <SortTypeSelector contents={sortTypeData} />
      <div className="flex flex-col gap-4 bg-em-gray-sm">
        {dummyData.map((item) => (
          <PostItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default PostList
