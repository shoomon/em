import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  // 토큰 조회
  const accessToken = localStorage.getItem("accessToken")

  const { isError } = useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: () => {
      return axios.get("/user")
    },
    enabled: !!accessToken,
  })

  // 로그인 상태
  // const { isLoggedIn, setIsLoggedIn } = useAuthStore()

  // 1. 로그인 상태 확인
  // useEffect(() => {
  //   if (!accessToken && !isLoggedIn) {
  //     setIsLoggedIn(false)
  //   } else {
  //     setIsLoggedIn(true)
  //   }
  //   console.log("로그인 상태 확인", isLoggedIn)
  // }, [accessToken, isLoggedIn, setIsLoggedIn])

  let isTokenValid = false

  // 2. JWT 토큰 검증 (일단 임시로 JWT 인지만 확인)
  if (accessToken) {
    isTokenValid = jwtDecode(accessToken)
  }

  // 토큰이 없거나 유효하지 않으면 로그인 페이지로 리다이렉트
  if (!accessToken || !isTokenValid || isError) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
