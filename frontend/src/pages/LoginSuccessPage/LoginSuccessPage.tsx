import EmLoading from "@/components/EmLoading/EmLoading"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const LoginSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const accessToken = searchParams.get("accessToken")
  const navigate = useNavigate()

  useEffect(() => {
    try {
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken)
        navigate("/terms-agreement", { replace: true })
      }
    } catch (error) {
      console.error("로그인 실패", error)
      navigate("/login", { replace: true })
    }
  }, [accessToken, navigate])

  return <EmLoading className="w-full h-dvh" />
}

export default LoginSuccessPage
