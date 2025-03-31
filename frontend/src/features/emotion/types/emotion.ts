export type EmotionEngNameType =
  | "ANGER"
  | "SURPRISE"
  | "JOY"
  | "TRUST"
  | "SADNESS"
  | "FEAR"
  | "ANTICIPATION"
  | "DISGUST"

export type EmotionKorNameType =
  | "분노"
  | "당황"
  | "기쁨"
  | "확신"
  | "슬픔"
  | "공포"
  | "기대"
  | "혐오"

export enum EmotionMapping {
  ANGER = "분노",
  SURPRISE = "당황",
  JOY = "기쁨",
  TRUST = "신뢰",
  SADNESS = "슬픔",
  FEAR = "공포",
  ANTICIPATION = "기대",
  DISGUST = "혐오",
}

export interface Emotion {
  id: number
  engName: EmotionEngNameType
  korName: EmotionKorNameType
}

export interface EmotionItem extends Emotion {
  emoji: string
  emojiGif_url: string
  color: string
}

export type EmotionStatisticsData = {
  [key in EmotionEngNameType]: number
}
