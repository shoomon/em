import { LatLng } from "@/features/map/types/map"
import { StepForward } from "lucide-react"
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

  const handleClick = (music: Music) => {
    if (music.spotifyAlbumUrl) {
      window.open(music.spotifyAlbumUrl, "_blank")
    }
  }

  const isEmpty =
    !data || data.pages.every((page: any) => page.musicList.length === 0)

  return (
    <div className="overflow-y-auto h-[75dvh] px-4">
      {isPending ? (
        Array.from({ length: 6 }).map((_, index) => (
          <MusicSkeleton key={index} />
        ))
      ) : isEmpty ? (
        <MusicEmpty description="게시글에 등록된 음악이 없어요" />
      ) : (
        <>
          {data.pages.map((page: any) =>
            page.musicList.map((item: Music, index: number) => (
              <MusicItem
                key={index}
                music={item}
                className="border-b border-b-em-gray-md">
                <button
                  className="cursor-pointer shrink-0"
                  onClick={() => handleClick(item)}>
                  <StepForward className="stroke-em-gray size-5" />
                </button>
              </MusicItem>
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
