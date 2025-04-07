import MusicChartSection from "@/features/recommend/components/MusicChartSection"
import MusicRecommendSection from "@/features/recommend/components/MusicRecommendSection"
import RecommendIntroAnimation from "@/features/recommend/components/RecommendIntroAnimation"
import { useState } from "react"

const dummyData = [
  {
    musicId: "1",
    albumImageUrl: " https://i.maniadb.com/images/album/732/732046_1_f.jpg",
    spotifyTrackUrl: "",
    title: "사랑에 빠졌을 때",
    artistName: "볼빨간사춘기",
  },
  {
    musicId: "2",
    albumImageUrl: "https://i.maniadb.com/images/album/747/747251_1_f.jpg",
    spotifyTrackUrl: "",
    title: "나의 사춘기에게",
    artistName: "볼빨간사춘기",
  },
  {
    musicId: "3",
    albumImageUrl: "https://i.maniadb.com/images/album/758/758815_1_f.jpg",
    spotifyTrackUrl: "",
    title: "여행",
    artistName: "볼빨간사춘기",
  },
  {
    musicId: "4",
    albumImageUrl: "https://i.maniadb.com/images/album/767/767471_1_f.jpg",
    spotifyTrackUrl: "",
    title: "Mermaid",
    artistName: "볼빨간사춘기",
  },
  {
    musicId: "5",
    albumImageUrl: "https://i.maniadb.com/images/album/930/930973_1_f.jpg",
    spotifyTrackUrl: "",
    title: "Seoul",
    artistName: "볼빨간사춘기",
  },
  {
    musicId: "6",
    albumImageUrl: "  https://i.maniadb.com/images/album/763/763433_1_f.jpg",
    spotifyTrackUrl: "",
    title: "왜 몰랐을까",
    artistName: "로이킴",
  },

  {
    musicId: "7",
    albumImageUrl: "https://i.maniadb.com/images/album/996/996760_1_f.jpg",
    spotifyTrackUrl: "",
    title: "피차일반",
    artistName: "음율",
  },
  {
    musicId: "8",
    albumImageUrl: "https://i.maniadb.com/images/album/1049/049251_1_f.jpg",
    spotifyTrackUrl: "",
    title: "고민중독",
    artistName: "QWER",
  },
  {
    musicId: "9",
    albumImageUrl: "https://i.maniadb.com/images/album/788/788923_1_f.jpg",
    spotifyTrackUrl: "",
    title: "시작",
    artistName: "가호",
  },
  {
    musicId: "10",
    albumImageUrl: "https://i.maniadb.com/images/album/788/788939_1_f.jpg",
    spotifyTrackUrl: "",
    title: "그때 그 아인",
    artistName: "김필",
  },
]

const RecommendPage = () => {
  const [isIntroPlaying, setIsIntroPlaying] = useState(true)

  return (
    <div className="relative">
      <MusicRecommendSection musicList={dummyData} />
      <MusicChartSection musicList={dummyData} />
      {isIntroPlaying && (
        <RecommendIntroAnimation onComplete={() => setIsIntroPlaying(false)} />
      )}
    </div>
  )
}

export default RecommendPage
