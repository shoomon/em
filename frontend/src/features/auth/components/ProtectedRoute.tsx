import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  // 토큰 조회
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
