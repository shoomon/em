import { LOGIN_PROVIDERS } from "@/features/auth/constants"
import { useEffect, useState } from "react"
import { fetchProfile } from "../api/profileApi"
import { ProfileWithImage } from "../types/ProfileWithImage"

export const useProfileData = () => {
  const [profile, setProfile] = useState<ProfileWithImage | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true)
      try {
        const data = await fetchProfile()

        const provider = LOGIN_PROVIDERS.find((provider) => provider.provider === data.provider)

        const updateProfile: ProfileWithImage = { ...data, providerImage: provider?.image }

        setProfile(updateProfile)
      } catch (err) {
        setError("프로필을 불러오는 데 실패했습니다.")
      } finally {
        setIsLoading(false)
      }
    }

    getProfile()
  }, [])

  return { profile, isLoading, error }
}

export default useProfileData
