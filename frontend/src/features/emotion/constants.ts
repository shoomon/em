import angerImage from "@/assets/anger.svg"
import joyImage from "@/assets/joy.svg"
import sadnessImage from "@/assets/sadness.svg"
import surpriseImage from "@/assets/surprise.svg"
import trustImage from "@/assets/trust.svg"
import { EmotionItem } from "./types/emotion"

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
    engName: "TRUST",
    korName: "확신",
    emoji: "👍",
    color: "bg-em-trust hover:bg-em-trust/80",
    emojiGif_url: "/assets/images/emotions/trust.gif",
  },
  {
    id: 5,
    engName: "SADNESS",
    korName: "슬픔",
    emoji: "😢",
    color: "bg-em-sadness hover:bg-em-sadness/80",
    emojiGif_url: "/assets/images/emotions/sadness.gif",
  },
  {
    id: 6,
    engName: "FEAR",
    korName: "공포",
    emoji: "😨",
    color: "bg-em-fear hover:bg-em-fear/80",
    emojiGif_url: "/assets/images/emotions/fear.gif",
  },
  {
    id: 7,
    engName: "ANTICIPATION",
    korName: "기대",
    emoji: "🤩",
    color: "bg-em-anticipation hover:bg-em-anticipation/80",
    emojiGif_url: "/assets/images/emotions/anticipation.gif",
  },
  {
    id: 8,
    engName: "DISGUST",
    korName: "혐오",
    emoji: "🤢",
    color: "bg-em-disgust hover:bg-em-disgust/80",
    emojiGif_url: "/assets/images/emotions/disgust.gif",
  },
]

export const EMOTION_TEXT_COLOR_MAPPER: Record<string, string> = {
  JOY: "text-em-JOY",
  ANTICIPATION: "text-em-ANTICIPATION",
  TRUST: "text-em-TRUST",
  SURPRISE: "text-em-SURPRISE",
  DISGUST: "text-em-DISGUST",
  FEAR: "text-em-FEAR",
  ANGER: "text-em-ANGER",
  SADNESS: "text-em-SADNESS",
}

export const EMOTION_BORDER_COLOR_MAPPER: Record<string, string> = {
  JOY: "border-em-JOY",
  ANTICIPATION: "border-em-ANTICIPATION",
  TRUST: "border-em-TRUST",
  SURPRISE: "border-em-SURPRISE",
  DISGUST: "border-em-DISGUST",
  FEAR: "border-em-FEAR",
  ANGER: "border-em-ANGER",
  SADNESS: "border-em-SADNESS",
}

export const REACTION_ICON_MAPPER: Record<string, string> = {
  joy: joyImage,
  sadness: sadnessImage,
  anger: angerImage,
  surprise: surpriseImage,
  trust: trustImage,
}
