import { toast } from "sonner"
import { fetchLogout } from "../api/authApi"

const LogoutText = () => {
  const handleLogout = async () => {
    try {
      await fetchLogout()
      localStorage.removeItem("accessToken")
      window.location.href = "/"
    } catch (error) {
      console.error("로그아웃 실패", error)
      toast.error("로그아웃에 실패했습니다. 다시 시도해주세요")
    }
  }

  return (
    <span
      onClick={handleLogout}
      className="text-em-gray cursor-pointer text-sm underline underline-offset-2">
      로그아웃
    </span>
  )
}

export default LogoutText
