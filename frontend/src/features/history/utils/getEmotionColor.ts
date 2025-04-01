import { EMOTION_ITEMS } from "@/features/emotion/constants"

export const getEmotionColorClass = (emotion: string) => {
  const item = EMOTION_ITEMS.find((e) => e.engName === emotion)
  return item?.color.split(" ")[0] || "" // hover 효과 제거, 배경색만 사용
}
