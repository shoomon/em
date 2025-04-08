export type EmotionEngNameType =
  | "ANGER"
  | "SURPRISE"
  | "JOY"
  | "SADNESS"
  | "FEAR"
  | "NEUTRAL"
  | "TRUST"
  | "ANTICIPATION"
  | "DISGUST"

export type EmotionKorNameType =
  | "분노"
  | "당황"
  | "기쁨"
  | "슬픔"
  | "공포"
  | "덤덤"
  | "확신"
  | "기대"
  | "혐오"

export enum EmotionMapping {
  분노 = "ANGER",
  당황 = "SURPRISE",
  기쁨 = "JOY",
  슬픔 = "SADNESS",
  공포 = "FEAR",
  덤덤 = "NEUTRAL",
  기대 = "ANTICIPATION",
  확신 = "TRUST",
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

export type EmotionReportResponse = {
  [key in EmotionEngNameType]: number
}

export type EmotionPercentages = {
  [key in EmotionEngNameType]: string
}

export interface EmotionAnalysisResponse {
  label: EmotionEngNameType
  confidence: number
  all_probs: Record<EmotionEngNameType, number>
}

export interface CurseAnalysisResponse {
  isCurse: boolean
  confidence: number
  allProbs: Record<"FALSE" | "TRUE", number>
}
