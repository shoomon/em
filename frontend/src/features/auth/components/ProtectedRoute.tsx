import { jwtDecode } from "jwt-decode"
import { Navigate, Outlet } from "react-router-dom"
const ProtectedRoute = () => {
  // 토큰 조회
  const accessToken = localStorage.getItem("accessToken")
  let isTokenValid = false

  // JWT 토큰 검증
  if (accessToken) {
    isTokenValid = jwtDecode(accessToken)
  }

  // 토큰이 없거나 유효하지 않으면 로그인 페이지로 리다이렉트
  if (!accessToken || !isTokenValid) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
