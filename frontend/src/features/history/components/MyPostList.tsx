import PostItem from "@/features/post/components/PostItem"
import { Post } from "@/features/post/types/post"
import emptyImage from '@/assets/search_bear.png';

interface MyPostListProps {
  postList: Post[]
}

const MyPostList = ({ postList }: MyPostListProps) => {
  return (
    <div className="flex flex-col overflow-y-auto h-full">
      <div className="flex flex-col flex-1 gap-4">
        {postList.length === 0 ? (
          <div className="flex flex-col gap-3 rounded-lg p-4 bg-em-gray-md">
            <div className="text-[clamp(0.8rem,4vw,1.2rem)] text-em-black">작성한 게시글이 없어요.</div>
            <img src={emptyImage} alt="" className="self-end w-1/2 my-4" />
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
