const PostSkeleton = () => {
  return (
    <div className={`flex flex-col gap-3 p-4 bg-em-white`}>
      <div className="flex items-center gap-2 flex-1">
        <div className="rounded-full size-8 bg-em-gray-md animate-pulse" />

        <div className="flex flex-col gap-1 flex-1">
          <div className="flex justify-between">
            <div className="h-5 rounded-full w-36 bg-em-gray-md animate-pulse" />
            <div className="h-4 rounded-full w-12 bg-em-gray-md animate-pulse" />
          </div>

          <div className="h-3 rounded-full w-20 bg-em-gray-md animate-pulse" />
        </div>
      </div>

      <div className="h-32 bg-em-gray-md animate-pulse rounded-xl" />
    </div>
  )
}

export default PostSkeleton
