import angerImage from "@/assets/anger.svg"
import joyImage from "@/assets/joy.svg"
import sadnessImage from "@/assets/sadness.svg"
import surpriseImage from "@/assets/surprise.svg"
import trustImage from "@/assets/trust.svg"
import { EmotionEngNameType, EmotionItem } from "./types/emotion"

export const EMOTION_ITEMS: EmotionItem[] = [
  {
    id: 1,
    engName: "ANGER",
    korName: "분노",
    emoji: "😠",
    color: "bg-em-anger hover:bg-em-anger/80",
    emojiGif_url: "/assets/images/emotions/anger.gif",
  },
  {
    id: 2,
    engName: "SURPRISE",
    korName: "당황",
    emoji: "😲",
    color: "bg-em-surprise hover:bg-em-surprise/80",
    emojiGif_url: "/assets/images/emotions/surprise.gif",
  },
  {
    id: 3,
    engName: "JOY",
    korName: "기쁨",
    emoji: "😊",
    color: "bg-em-joy hover:bg-em-joy/80",
    emojiGif_url: "/assets/images/emotions/joy.gif",
  },

  {
    id: 4,
    engName: "SADNESS",
    korName: "슬픔",
    emoji: "😢",
    color: "bg-em-sadness hover:bg-em-sadness/80",
    emojiGif_url: "/assets/images/emotions/sadness.gif",
  },
  {
    id: 5,
    engName: "FEAR",
    korName: "공포",
    emoji: "😨",
    color: "bg-em-fear hover:bg-em-fear/80",
    emojiGif_url: "/assets/images/emotions/fear.gif",
  },
  {
    id: 6,
    engName: "NEUTRAL",
    korName: "무감정",
    emoji: "😐",
    color: "bg-em-neutral hover:bg-em-neutral/80",
    emojiGif_url: "/assets/images/emotions/neutral.gif",
  },
]

export const EMOTION_TEXT_COLOR_MAPPER: Record<EmotionEngNameType, string> = {
  JOY: "text-em-JOY",
  SURPRISE: "text-em-SURPRISE",
  FEAR: "text-em-FEAR",
  ANGER: "text-em-ANGER",
  SADNESS: "text-em-SADNESS",
  NEUTRAL: "text-em-NEUTRAL",
}

export const EMOTION_BORDER_COLOR_MAPPER: Record<string, string> = {
  JOY: "border-em-JOY",
  SURPRISE: "border-em-SURPRISE",
  FEAR: "border-em-FEAR",
  ANGER: "border-em-ANGER",
  SADNESS: "border-em-SADNESS",
  NEUTRAL: "border-em-NEUTRAL",
}

export const REACTION_ICON_MAPPER: Record<string, string> = {
  joy: joyImage,
  sadness: sadnessImage,
  anger: angerImage,
  surprise: surpriseImage,
  trust: trustImage,
}
