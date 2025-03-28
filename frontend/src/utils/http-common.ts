import { fetchReissue } from "@/features/auth/api/authApi"
import {
  CustomRequestConfig,
  ErrorCode,
  ErrorCustomResponseData,
} from "@/types/Error"
import axios, { AxiosError } from "axios"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL, //"/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000 * 10, // 10초
  withCredentials: true,
})

// 리프레시 토큰 인터셉터 핸들러
const responseInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config as CustomRequestConfig // 원래 요청 정보 저장
  originalRequest.headers.clear() // 헤더 초기화 (토큰 제거)

  const errorResponseData: ErrorCustomResponseData = error.response
    ?.data as ErrorCustomResponseData

  // 만료된 토큰에 대하여 처리
  if (errorResponseData.code === ErrorCode.EXPIRED_JWT_TOKEN) {
    localStorage.removeItem("accessToken")
    await fetchReissue()
  }

  // 권한 없음
  if (errorResponseData.code === ErrorCode.FORBIDDEN) {
    // ✅ 403 에러 처리
    console.log("권한 없음", error)
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
