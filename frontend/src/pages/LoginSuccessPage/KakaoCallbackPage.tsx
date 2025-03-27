import EmLoading from "@/components/EmLoading/EmLoading"
import useLocationStore from "@/store/useLocationStore"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const LoginSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const accessToken = searchParams.get("accessToken")
  const navigate = useNavigate()
  const checkPermission = useLocationStore((state) => state.checkPermission)

  useEffect(() => {
    const handleLogin = async () => {
      try {
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken)
        }
        await checkPermission()
      } catch (error) {
        console.error("로그인 실패", error)
        navigate("/login", { replace: true })
      } finally {
        setTimeout(() => {
          navigate("/", { replace: true })
        }, 2000)
      }
    }

    handleLogin()
  }, [accessToken, navigate])

  return <EmLoading />
}
export default LoginSuccessPage
