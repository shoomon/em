import EmLoading from "@/components/EmLoading/EmLoading"
import useTermAgreement from "@/features/settings/hooks/useTermAgreement"
import { jwtDecode } from "jwt-decode"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  // 토큰 조회
  const accessToken = localStorage.getItem("accessToken")
  const {
    data: isTermsAgreed,
    isError,
    isPending,
    isFetched,
  } = useTermAgreement()

  let isTokenValid = false

  // 2. JWT 토큰 검증 (일단 임시로 JWT 인지만 확인)
  if (accessToken) {
    try {
      jwtDecode(accessToken)
      isTokenValid = true
    } catch (error) {
      isTokenValid = false
    }
  }

  // 로딩 중일 때는 리다이렉트하지 않고 대기
  if (isPending && isFetched) {
    return <EmLoading className="w-full h-dvh" />
  }

  // 인증 실패 시 로그인 페이지로 리다이렉트
  if (!accessToken || !isTokenValid || isError) {
    return <Navigate to="/login" replace />
  }

  // 약관 동의가 필요한 경우
  if (!isTermsAgreed && isFetched) {
    return <Navigate to="/terms-agreement" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
