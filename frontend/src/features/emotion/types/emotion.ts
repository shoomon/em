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
  분노 = "ANGER",
  당황 = "SURPRISE",
  기쁨 = "JOY",
  확신 = "TRUST",
  슬픔 = "SADNESS",
  공포 = "FEAR",
  기대 = "ANTICIPATION",
  혐오 = "DISGUST",
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

export interface EmotionAnalysisResponse {}

export type EmotionReportResponse = {
  [key in EmotionEngNameType]: number
}

export type EmotionPercentages = {
  [key in EmotionEngNameType]: string
}
