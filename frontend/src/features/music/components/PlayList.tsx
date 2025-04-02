import { LatLng } from "@/features/map/types/map"
import React from "react"
import usePlayList from "../hooks/usePlayList"
import { Music } from "../types/music"
import MusicEmpty from "./MusicEmpty"
import MusicItem from "./MusicItem"
import MusicSkeleton from "./MusicSkeleton"

interface PlayListProps {
  location: LatLng
}

const PlayList = ({ location }: PlayListProps) => {
  const { data, isPending, isFetchingNextPage, observerRef } = usePlayList({
    location,
  })

  const isEmpty =
    !data || data.pages.every((page: any) => page.musicList.length === 0)

  return (
    <div className="overflow-y-auto h-[75dvh] px-4">
      {isPending ? (
        Array.from({ length: 6 }).map((_, index) => (
          <MusicSkeleton key={index} />
        ))
      ) : isEmpty ? (
        <MusicEmpty description="메시지에 등록된 음악이 없어요" />
      ) : (
        <>
          {data.pages.map((page: any) =>
            page.musicList.map((item: Music, index: number) => (
              <MusicItem key={index} music={item} />
            )),
          )}

          {isFetchingNextPage ? (
            Array.from({ length: 6 }).map((_, index) => (
              <MusicSkeleton key={index} />
            ))
          ) : (
            <div ref={observerRef} className="h-1" />
          )}
        </>
      )}
    </div>
  )
}

export default React.memo(PlayList)
