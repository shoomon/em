import emptyImage from "@/assets/search_bear.png"
import PostItem from "@/features/post/components/PostItem"
import { Post } from "@/features/post/types/post"

interface MyPostListProps {
  postList: Post[]

  onDeletePost: (postId: number) => void
}

const MyPostList = ({ postList, onDeletePost }: MyPostListProps) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex flex-col flex-1 gap-4">
        {postList.length === 0 ? (
          <div className="flex flex-col gap-3 p-4 rounded-lg bg-em-gray-md">
            <div className="text-[clamp(1rem,4vw,1.4rem)] text-em-black/70 font-bold">
              작성한 게시글이 없어요..
            </div>
            <img src={emptyImage} alt="" className="self-end w-1/2 my-4" />
          </div>
        ) : (
          postList.map((item) => (
            <PostItem
              key={item.postId}
              {...item}
              className="rounded-xl"
              onDelete={() => {
                onDeletePost(item.postId)
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default MyPostList
