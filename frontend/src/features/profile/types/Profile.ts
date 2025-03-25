import { OAuthProvider } from "@/features/auth/types/auth.type"

export interface Profile {
  userId: number
  profileImageUrl: string
  nickname: string
  provider: OAuthProvider
  socialId: string
}
