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
      }
    } catch (error) {
      console.error("로그인 실패", error)
      navigate("/login", { replace: true })
    } finally {
      setTimeout(() => {
        navigate("/", { replace: true })
      }, 2000)
    }
  }, [accessToken, navigate])

  return (
    <>
      <EmLoading />
    </>
  )
}
export default LoginSuccessPage
