import apiClient from "@/utils/http-common"
import {
  IsTermsAgreedResponse,
  Term,
  UpdateTermAgreementRequest,
} from "../types/terms.type"

// 전체 약관 목록 조회
export const fetchTerms = async (): Promise<Term[]> => {
  const response = await apiClient.get("/terms")
  return response.data
}

// 단일 약관 조회
export const fetchTerm = async (id: number): Promise<Term> => {
  const response = await apiClient.get(`/terms/${id}`)
  return response.data
}

// 필수 약관(개인정보 처리, 위치 기반)에 동의했는지 확인
export const fetchTermAgreementCheck =
  async (): Promise<IsTermsAgreedResponse> => {
    const response = await apiClient.get(`/users/terms/health`)
    return response.data
  }

// 약관 동의 여부 업데이트
export const updateTermAgreement = async (
  data: UpdateTermAgreementRequest,
): Promise<IsTermsAgreedResponse> => {
  const response = await apiClient.post(`/users/terms`, data)
  return response.data
}
