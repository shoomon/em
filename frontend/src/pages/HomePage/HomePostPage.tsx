import PostList from "@/features/post/components/PostList"
import SortTypeSelector from "@/features/post/components/SortTypeSelector"

const HomePostPage = () => {
  const sortTypes = [
    { label: "최신순", sortType: "latest" },
    { label: "거리순", sortType: "distance" },
    { label: "공감순", sortType: "like" },
  ]

  return (
    <div>
      <SortTypeSelector contents={sortTypes} />
      <PostList />
    </div>
  )
}

export default HomePostPage
