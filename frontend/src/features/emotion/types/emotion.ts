export interface Emotion {
  id: number
  engName: string
  korName: string
}

export interface EmotionItem extends Emotion {
  emoji: string
  emojiGif_url: string
  color: string
}
