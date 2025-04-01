import { EmotionEngNameType } from "@/features/emotion/types/emotion"

export interface EmotionCalendarResponse {
  dateColor: Record<string, EmotionEngNameType>
}
