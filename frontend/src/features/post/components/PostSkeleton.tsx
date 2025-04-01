const PostSkeleton = () => {
  return (
    <div className={`flex flex-col gap-3 p-4 bg-em-white`}>
      <div className="flex items-center gap-1">
        <div className="rounded-full size-5 bg-em-gray-md animate-pulse" />
        <div className="w-40 h-5 rounded-full bg-em-gray-md animate-pulse" />
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full size-8 bg-em-gray-md animate-pulse" />
          <div className="h-5 rounded-full w-28 bg-em-gray-md animate-pulse" />
        </div>
      </div>

      <div className="h-32 bg-em-gray-md animate-pulse rounded-xl" />
    </div>
  )
}

export default PostSkeleton
