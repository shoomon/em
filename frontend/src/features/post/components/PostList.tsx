import PostItem from "./PostItem"
import SortTypeSelector from "./SortTypeSelector"

const sortTypeData = [
  { label: "최신순", sortType: "latest" },
  { label: "거리순", sortType: "distance" },
  { label: "공감순", sortType: "popular" },
]

const dummyData = [
  {
    id: 1,
    location: "서울 강남구 테헤란로 212",
    lat: 37.501286,
    lng: 127.0396029,
    date: "5분 전",
    author: "걱정하는 강아지",
    content:
      "오늘 SSAFY 14기 면접 보러가는데 엄청 떨려요.\n잘 할 수 있겠죠ㅠㅠ?\n면접 보시는 분들 14기 돼서 꼭 만나요.",
    emoji: { happy: 1, sad: 20, love: 213, angry: 2, confident: 234 },
  },
  {
    id: 2,
    location: "서울 강남구 테헤란로 213",
    lat: 37.5013068,
    lng: 127.0371728,
    date: "13분 전",
    author: "울먹이는 바다코끼리",
    content: "ㅠㅠ",
    emoji: { happy: 1, sad: 20, love: 213, angry: 2, confident: 234 },
  },
  {
    id: 3,
    location: "서울 강남구 테헤란로 214",
    lat: 37.5033214,
    lng: 127.0384099,
    date: "1시간 전",
    author: "기뻐하는 판다곰",
    content: "노브랜드 버거 먹는 중 꿀맛~!",
    emoji: { happy: 1, sad: 20, love: 213, angry: 2, confident: 234 },
  },
  {
    id: 4,
    location: "서울 강남구 테헤란로 214",
    lat: 37.5031847,
    lng: 127.0392911,
    date: "3시간 전",
    author: "기뻐하는 판다곰",
    content: "인생 쓰다...내가 지금 마시는 바나프레소 에스프레소처럼",
    emoji: { happy: 1, sad: 20, love: 213, angry: 2, confident: 234 },
  },
]

interface PostListProps {
  location: { lat: number; lng: number }
}

const PostList = ({ location }: PostListProps) => {
  // const { data, isLoading } = useInfiniteQuery<PostInfiniteData>({
  //   queryKey: ["post"],
  //   queryFn: ({ pageParam = 0 }) =>
  //   getNextPageParam: (lastPage) => (lastPage.meta?.hasNext ? lastPage.meta.lastId : undefined),
  //   refetchOnWindowFocus: false,
  // })

  // fetchPostList({
  //   lat: location.lat,
  //   lng: location.lng,
  //   postId: lastId,
  // })

  // if (isLoading) {
  //   return null
  // }

  return (
    <div className="overflow-y-auto h-[75dvh]">
      <SortTypeSelector contents={sortTypeData} />
      <div className="flex flex-col gap-4 bg-em-gray-sm">
        {/* {dummyData.map((item) => (
          <PostItem key={item.id} {...item} />
        ))} */}
        {data.map((item) => (
          <PostItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default PostList
