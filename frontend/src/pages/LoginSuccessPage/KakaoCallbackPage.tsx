import EmLoading from "@/components/EmLoading/EmLoading"
import useLocationStore from "@/store/useLocationStore"
import { getCurrentPosition, getLocationPermission } from "@/utils/location"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const LoginSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const accessToken = searchParams.get("accessToken")
  const navigate = useNavigate()
  const setCurrentLocation = useLocationStore(
    (state) => state.setCurrentLocation,
  )

  const checkLocationPermission = async () => {
    const pemissionState = await getLocationPermission()
    if (!pemissionState || pemissionState === "denied") {
      alert("서비스 이용을 위해 위치 권한을 허용해주세요.")
    } else {
      const location = await getCurrentPosition()
      setCurrentLocation(location)
    }

    sessionStorage.setItem("location-permission", pemissionState!)
  }

  useEffect(() => {
    try {
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken)
      }
    } catch (error) {
      console.error("로그인 실패", error)
      navigate("/login", { replace: true })
    } finally {
      checkLocationPermission()
      setTimeout(() => {
        navigate("/", { replace: true })
      }, 2000)
    }
  }, [accessToken, navigate])

  return <EmLoading />
}
export default LoginSuccessPage
