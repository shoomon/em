const MusicSkeleton = () => {
  return (
    <div className="flex items-center gap-2 py-2 border-b border-b-em-gray-md bg-em-white">
      <div className="rounded-lg bg-em-gray-md size-12 animate-pulse" />

      <div className="flex items-center justify-between flex-1 gap-2">
        <div className="flex flex-col gap-0.5">
          <div className="w-32 bg-em-gray-md rounded-xl animate-pulse size-4" />
          <div className="w-20 bg-em-gray-md rounded-xl animate-pulse size-3" />
        </div>
      </div>
    </div>
  )
}

export default MusicSkeleton
