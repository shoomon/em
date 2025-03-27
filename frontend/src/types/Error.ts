import { InternalAxiosRequestConfig } from "axios"

export interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export interface ErrorCustomResponseData {
  code: ErrorCode
  message: string
}

export enum ErrorCode {
  // 인증 관련
  UNAUTHORIZED = "B4011", // 인증 실패
  EXPIRED_JWT_TOKEN = "B4012", // 토큰 만료
  FORBIDDEN = "B4031", // 권한 없음

  // 회원 관련

  // 게시글 관련
}
