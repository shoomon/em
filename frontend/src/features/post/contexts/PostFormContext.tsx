import { LatLng } from "@/features/map/types/map"
import {
  createContext,
  FormEvent,
  type ReactNode,
  use,
  useCallback,
  useState,
} from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import usePostCreate from "../hooks/usePostCreate"
import {
  PostCreateRequest,
  PostCreateStep,
  PostFormActionType,
  PostFormStateType,
} from "../types/post"

const PostFormStateContext = createContext<PostFormStateType | undefined>(
  undefined,
)
const PostFormActionContext = createContext<PostFormActionType | undefined>(
  undefined,
)

const PostFormProvider = ({ children }: { children: ReactNode }) => {
  const [_, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { createPostAsync, isPending } = usePostCreate()

  // 포커스 상태 관리
  const [isFocus, setIsFocus] = useState<boolean>(false)

  // 스탭 상태 관리
  const [currentStep, setCurrentStep] = useState<PostCreateStep>(
    PostCreateStep.Map,
  )
  // Form 상태 관리
  const [formData, setFormData] = useState<PostCreateRequest>({
    content: "",
    latitude: 0,
    longitude: 0,
    emotion: "",
    address: "",
  })

  // formData에 입력을 했는지 확인하는 함수
  const isFormDataValid = useCallback(
    (step: PostCreateStep) => {
      if (step === PostCreateStep.Map) {
        return formData.latitude !== 0 && formData.longitude !== 0
      }
      if (step === PostCreateStep.Emotion) {
        return formData.emotion !== ""
      }
      if (step === PostCreateStep.Content) {
        return formData.content.trim() !== ""
      }
    },
    [formData],
  )

  // 스탭 변경 이벤트
  const updateStep = useCallback(
    (step: PostCreateStep) => {
      setCurrentStep(step)
      setSearchParams({ step: step.toString() })
    },
    [setCurrentStep, setSearchParams],
  )
  // 지도 변경 시 호출
  const handleMapChange = (map: LatLng, address: string) => {
    setFormData({
      ...formData,
      latitude: map.lat,
      longitude: map.lng,
      address,
    })
  }

  // 폼 데이터 업데이트 이벤트
  const updateFormData = useCallback(
    (key: keyof PostCreateRequest, value: any) => {
      setFormData({ ...formData, [key]: value })
    },
    [formData],
  )

  // 폼 제출 이벤트
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // Todo: 내용이 비어있을 경우 게시글 작성 불가능 에러 알려주기
      try {
        await createPostAsync(formData)
        // 게시글 작성 성공 시 메인 페이지로 이동
        alert("게시글이 작성되었습니다.")
        navigate("/", { replace: true })
      } catch (error) {
        console.error(error)
        alert("게시글 작성에 실패했습니다.")
      }
    },
    [formData, createPostAsync, navigate],
  )

  // value 초기화
  const postFormStateValue = {
    isFocus,
    currentStep,
    formData,
    isSubmitPending: isPending,
  }
  const postFormActionValue = {
    setIsFocus,
    updateStep,
    handleMapChange,
    updateFormData,
    handleSubmit,
    isFormDataValid,
  }

  return (
    <PostFormStateContext value={postFormStateValue}>
      <PostFormActionContext value={postFormActionValue}>
        {children}
      </PostFormActionContext>
    </PostFormStateContext>
  )
}

export default PostFormProvider

export const usePostFormState = () =>
  use(PostFormStateContext) as PostFormStateType
export const usePostFormAction = () =>
  use(PostFormActionContext) as PostFormActionType
export const usePostForm = () => ({
  ...usePostFormState(),
  ...usePostFormAction(),
})
