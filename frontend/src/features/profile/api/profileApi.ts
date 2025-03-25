import { Profile } from "../types/Profile"

export const fetchProfile = async (): Promise<Profile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userId: 1,
        profileImageUrl: "https://cataas.com/cat",
        nickname: "박창조",
        provider: "kakao",
        socialId: "hong@example.com",
      } as Profile)
    }, 500) // 네트워크 지연 흉내내기
  })
}
