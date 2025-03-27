import { fetchReissue } from "@/features/auth/api/authApi"
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000 * 10, // 10초
  withCredentials: true,
})

let isRefreshing = false // 리프레시 토큰 갱신 중
let refreshSubscribers: ((token: string) => void)[] = [] // 토큰 갱신 구독자 목록

// 리프레시 토큰 인터셉터 핸들러
const responseInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config as CustomRequestConfig // 원래 요청 정보 저장

  // 401 에러 처리
  if (error.response?.status === 401) {
    // ✅ 이미 토큰 재발급 시도한 요청이면 강제 로그아웃
    if (originalRequest._retry) {
      console.log("토큰 재발급 실패")
      localStorage.removeItem("accessToken")

      // 로그인 페이지로 이동
      window.location.href = "/login"

      return Promise.reject(error)
    }

    originalRequest._retry = true // ✅ 첫 번째 401에서는 재시도 플래그 설정

    // 이미 리프레시 중인 경우 새로운 요청을 큐에 추가
    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshSubscribers.push((accessToken: string) => {
          // originalRequest.headers["Authorization"] = `Bearer ${accessToken}`
          resolve(apiClient(originalRequest))
        })
      })
    }

    isRefreshing = true // 리프레시 토큰 갱신 중

    try {
      const newAccessToken = await fetchReissue() // 새로운 토큰 발급

      // ✅ 새로운 토큰을 받은 후, 큐에 대기 중이던 요청들을 다시 실행
      refreshSubscribers.forEach((callback) => callback(newAccessToken))
      refreshSubscribers = []

      // ✅ 원래 요청 재시도
      // originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
      return apiClient(originalRequest)
    } catch (error) {
      // ✅ 리프레시 토큰 갱신 실패 시
      console.error("토큰 재발급 실패:", error)

      localStorage.removeItem("accessToken")
      if (window.location.pathname !== "/login") {
        window.location.href = "/login"
      }

      return Promise.reject(error)
    } finally {
      isRefreshing = false
    }
  } else if (error.response?.status === 403) {
    // ✅ 403 에러 처리
    // alert("권한이 없습니다.")
    return Promise.reject(error)
  }
}

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // const { accessToken } = useAuthStore.getState()
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 응답 인터셉터
apiClient.interceptors.response.use((response) => response, responseInterceptor)

export default apiClient
