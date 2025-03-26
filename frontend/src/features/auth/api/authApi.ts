import apiClient from "@/utils/http-common"

// 로그아웃
export const fetchLogout = async () => {
  const response = await apiClient.post("/auth/logout")
  return response.data
}

// 토큰 재발급
export const fetchReissue = async () => {
  try {
    const response = await apiClient.post("/auth/reissue")
    // ✅ 토큰 재발급 성공
    if (response.status === 200) {
      const accessToken = response.headers["authorization"]
      localStorage.setItem("accessToken", accessToken)
      return accessToken
    }
  } catch (error) {
    // ✅ 토큰 재발급 요청 실패
    console.error("토큰 재발급 요청 실패:", error)

    localStorage.removeItem("accessToken")
    window.location.href = "/login"

    throw new Error("토큰 재발급 실패")
  }
}
