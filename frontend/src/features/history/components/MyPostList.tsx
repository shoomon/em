import PostItem from "@/features/post/components/PostItem"
import { Post } from "@/features/post/types/post"

interface MyPostListProps {
  postList: Post[]
}

const MyPostList = ({ postList }: MyPostListProps) => {
  return (
    <div className="flex flex-col overflow-y-auto h-full">
      <div className="flex flex-col flex-1 gap-4 bg-em-gray-sm">
        {postList.length === 0 ? (
          <div className="flex flex-col gap-3 p-4 bg-em-white text-em-black text-center">
            작성한 게시글이 없습니다.
          </div>
        ) : (
          postList.map((item) => (
            <PostItem
              key={item.postId}
              {...item}
              onDelete={() => {
                console.log("delete")
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default MyPostList
