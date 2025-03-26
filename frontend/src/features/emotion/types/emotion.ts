export interface Emotion {
  id: number
  engName: string
  korName: string
}

export interface EmotionItem extends Emotion {
  emoji: string
  color: string
}
