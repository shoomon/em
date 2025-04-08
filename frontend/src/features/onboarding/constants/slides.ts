import logo from "@/assets/onboarding/logo.mp4"
import read from "@/assets/onboarding/read.mp4"
import write from "@/assets/onboarding/write.mp4"
import calendar from "@/assets/onboarding/calendar.mp4"
import musicRecommend from "@/assets/onboarding/music-recommend.mp4"

export const slides = [
  {
    id: 0,
    video_url: logo,
    title: "이음",
    subtitle: "지금 여기, 감정의 순간을 기록하다",
  },
  {
    id: 1,
    video_url: read,
    title: "당신의 위치에서",
    subtitle: "지도에 남겨진 마음을 확인하고, 공감해보세요.",
  },
  {
    id: 2,
    video_url: write,
    title: "당신의 감정을",
    subtitle: "위치에 남겨보세요, 음악도 가능해요.",
  },
  {
    id: 3,
    video_url: calendar,
    title: "달력에 감정을",
    subtitle: "색으로 표현해요. 지난 감정을 둘러보세요.",
  },
  {
    id: 4,
    video_url: musicRecommend,
    title: "감정을 모아",
    subtitle: "당신의 하루에 어울리는 음악을 전해드릴게요.",
  },
  {
    id: 5,
    video_url: "",
    title: "",
    subtitle: "",
  },
]
