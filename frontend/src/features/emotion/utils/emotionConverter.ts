import {
  EmotionEngNameType,
  EmotionKorNameType,
  EmotionMapping,
} from "../types/emotion"

// 영어 감정 이름을 한글 감정 이름으로 변환
export const engToKor = (engName: EmotionEngNameType): EmotionKorNameType => {
  const entries = Object.entries(EmotionMapping)
  const found = entries.find(([_, value]) => value === engName)
  if (!found) {
    throw new Error(`Invalid English emotion name: ${engName}`)
  }
  return found[0] as EmotionKorNameType
}

// 한글 감정 이름을 영어 감정 이름으로 변환
export const korToEng = (korName: EmotionKorNameType): EmotionEngNameType => {
  return EmotionMapping[korName]
}

// 영어 감정 이름 배열을 한글 감정 이름 배열로 변환
export const engArrayToKorArray = (
  engNames: EmotionEngNameType[],
): EmotionKorNameType[] => {
  return engNames.map(engToKor)
}

// 한글 감정 이름 배열을 영어 감정 이름 배열로 변환
export const korArrayToEngArray = (
  korNames: EmotionKorNameType[],
): EmotionEngNameType[] => {
  return korNames.map(korToEng)
}
