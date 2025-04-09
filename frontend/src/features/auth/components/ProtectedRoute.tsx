import useTermAgreement from "@/features/settings/hooks/useTermAgreement"
import { jwtDecode } from "jwt-decode"
import { Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  // 토큰 조회
  const accessToken = localStorage.getItem("accessToken")

  const { data: isTermsAgreed, isError } = useTermAgreement()

  // const { isError } = useQuery({
  //   queryKey: ["isLoggedIn"],
  //   queryFn: () => {
  //     return axios.get("/user")
  //   },
  //   enabled: !!accessToken,
  //   staleTime: 0, // 데이터를 캐시에 저장하지 않음
  //   gcTime: 0, // 데이터를 캐시에 저장하지 않음
  // })

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

  // 토큰이 없거나 유효하지 않으면 로그인 페이지로 리다이렉트
  // if (!accessToken || !isTokenValid || isError) {
  //   return <Navigate to="/login" replace />
  // } else if (!isTermsAgreed) {
  //   return <Navigate to="/terms-agreement" replace />
  // }

  return <Outlet />
}

export default ProtectedRoute
