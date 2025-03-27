import useAuthStore from "@/store/useAuthStore"
import apiClient from "@/utils/http-common"

// 로그아웃
export const fetchLogout = async () => {
  const response = await apiClient.post("/auth/logout")
  return response.data
}

// 토큰 재발급
export const fetchReissue = async () => {
  localStorage.removeItem("accessToken")
  try {
    const response = await apiClient.post("/auth/reissue")
    // ✅ 토큰 재발급 성공
    if (response.status === 200) {
      const accessToken = response.headers["authorization"]
      const { setAccessToken } = useAuthStore.getState()
      setAccessToken(accessToken)
      localStorage.setItem("accessToken", accessToken)
      return accessToken
    }
  } catch (error) {
    window.location.href = "/login"
    throw new Error("토큰 재발급 실패")
  }
}
