import { LatLng } from "@/features/map/types/map"
import { FormEvent, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { PostCreateResponse, PostCreateStep } from "../types/post"
import usePostCreate from "./usePostCreate"

const usePostForm = () => {
  const [_, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { createPostAsync, isPending, isSuccess } = usePostCreate()

  // 포커스 상태 관리
  const [isFocus, setIsFocus] = useState<boolean>(false)

  // 스탭 상태 관리
  const [currentStep, setCurrentStep] = useState<PostCreateStep>(PostCreateStep.Map)
  // Form 상태 관리
  const [formData, setFormData] = useState<PostCreateResponse>({
    content: "",
    latitude: 0,
    longitude: 0,
    emotion: "",
  })

  // formData에 입력을 했는지 확인하는 함수
  const isFormDataValid = (step: PostCreateStep) => {
    if (step === PostCreateStep.Map) {
      return formData.latitude !== 0 && formData.longitude !== 0
    }
    if (step === PostCreateStep.Emotion) {
      return formData.emotion !== ""
    }
    if (step === PostCreateStep.Content) {
      return formData.content.trim() !== ""
    }
  }

  // 스탭 변경 이벤트
  const updateStep = (step: PostCreateStep) => {
    setCurrentStep(step)
    setSearchParams({ step: step.toString() })
  }

  // 지도 변경 시 호출
  const handleMapChange = (map: LatLng) => {
    setFormData({ ...formData, latitude: map.lat, longitude: map.lng })
  }

  // 폼 데이터 업데이트 이벤트
  const updateFormData = (key: keyof PostCreateResponse, value: any) => {
    setFormData({ ...formData, [key]: value })
  }

  // 폼 제출 이벤트
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    // Todo: 게시글 작성 요청
    // Todo: 내용이 비어있을 경우 게시글 작성 불가능 에러 알려주기
    try {
      await createPostAsync(formData)
      if (isSuccess) {
        // 게시글 작성 성공 시 메인 페이지로 이동
        navigate("/", { replace: true })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    //
    isFocus,
    isFormDataValid,
    isSubmitPending: isPending,
    setIsFocus,
    currentStep,
    handleMapChange,
    formData,
    updateStep,
    updateFormData,
    handleSubmit,
  }
}

export default usePostForm
