import { LatLng } from "@/features/map/types/map"
import React from "react"
import PlayListItem from "./PlaylistItem"

const dummyData = [
  {
    albumImageUrl: "  https://i.maniadb.com/images/album/732/732046_1_f.jpg",
    title: "사랑에 빠졌을 때",
    artistName: "볼빨간사춘기",
  },
  {
    albumImageUrl: "https://i.maniadb.com/images/album/747/747251_1_f.jpg",
    title: "나의 사춘기에게",
    artistName: "볼빨간사춘기",
  },
  {
    albumImageUrl: "https://i.maniadb.com/images/album/758/758815_1_f.jpg",
    title: "여행",
    artistName: "볼빨간사춘기",
  },
  {
    albumImageUrl: "https://i.maniadb.com/images/album/767/767471_1_f.jpg",
    title: "Mermaid",
    artistName: "볼빨간사춘기",
  },
  {
    albumImageUrl: "https://i.maniadb.com/images/album/930/930973_1_f.jpg",
    title: "Seoul",
    artistName: "볼빨간사춘기",
  },
  {
    albumImageUrl: "  https://i.maniadb.com/images/album/763/763433_1_f.jpg",
    title: "왜 몰랐을까",
    artistName: "로이킴",
  },

  {
    albumImageUrl: "https://i.maniadb.com/images/album/996/996760_1_f.jpg",
    title: "피차일반",
    artistName: "음율",
  },
  {
    albumImageUrl: "https://i.maniadb.com/images/album/1049/049251_1_f.jpg",
    title: "고민중독",
    artistName: "QWER",
  },
  {
    albumImageUrl: "https://i.maniadb.com/images/album/788/788923_1_f.jpg",
    title: "시작",
    artistName: "가호",
  },
  {
    albumImageUrl: "https://i.maniadb.com/images/album/788/788939_1_f.jpg",
    title: "그때 그 아인",
    artistName: "김필",
  },
]

interface PlayListProps {
  location: LatLng
}

const PlayList = ({ location }: PlayListProps) => {
  return (
    <div className="overflow-y-auto h-[75dvh] px-4">
      {dummyData.map((item, index) => (
        <PlayListItem
          key={index}
          albumName=""
          albumImageUrl={item.albumImageUrl}
          title={item.title}
          artistName={item.artistName}
        />
      ))}
    </div>
  )
}

export default React.memo(PlayList)
