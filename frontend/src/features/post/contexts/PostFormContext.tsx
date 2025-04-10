import { EmotionAnalysisResponse } from "@/features/emotion/types/emotion"
import { LatLng } from "@/features/map/types/map"
import { Music } from "@/features/music/types/music"
import { useQueryClient } from "@tanstack/react-query"
import {
  createContext,
  FormEvent,
  type ReactNode,
  use,
  useCallback,
  useState,
} from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"
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
  const queryClient = useQueryClient()

  // 스탭 상태 관리
  const [currentStep, setCurrentStep] = useState<PostCreateStep>(
    PostCreateStep.Map,
  )

  // 폼 제출 완료 여부 관리
  const [isSubmitCompleted, setIsSubmitCompleted] = useState(false)

  // Form 상태 관리
  const [formData, setFormData] = useState<PostCreateRequest>({
    content: "",
    latitude: 0,
    longitude: 0,
    emotion: "",
    address: "",
    musicId: null,
    isSelected: false,
    title: null,
    artistName: null,
    albumImageUrl: null,
    spotifyTrackUrl: null,
  })

  // 감정 분석 데이터 관리
  const [emotionAnalysisData, setEmotionAnalysisData] =
    useState<EmotionAnalysisResponse>()

  // 비속어 여부 관리
  const [isCurse, setIsCurse] = useState<boolean | undefined>(undefined)

  // 감정 직접 선택 여부 관리
  const handleIsSelected = (isSelected: boolean) => {
    setFormData((prev) => ({ ...prev, isSelected }))
  }

  // formData에 입력을 했는지 확인하는 함수
  const isFormDataValid = useCallback(
    (step: PostCreateStep): boolean => {
      if (step === PostCreateStep.Map) {
        return formData.latitude !== 0 && formData.longitude !== 0
      }
      if (step === PostCreateStep.Emotion) {
        return formData.emotion !== ""
      }
      if (step === PostCreateStep.Content) {
        return formData.content.trim() !== "" || formData.title !== null
      }
      return false
    },
    [formData],
  )

  // 스탭 변경 이벤트
  const updateStep = useCallback(
    (step: PostCreateStep) => {
      setCurrentStep(step)
      setSearchParams({ step: step.toString() }, { replace: true })
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

  // 음악 변경 시 호출
  const handleMusicChange = (music: Music | null) => {
    if (music) {
      setFormData((prev) => ({ ...prev, ...music }))
    } else {
      setFormData((prev) => ({
        ...prev,
        title: null,
        artistName: null,
        albumImageUrl: null,
        spotifyTrackUrl: null,
      }))
    }
  }

  // 폼 데이터 업데이트 이벤트
  const updateFormData = (key: keyof PostCreateRequest, value: any) => {
    if (key === "content") {
      setEmotionAnalysisData(undefined)
      setIsCurse(undefined)
    }
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  // 폼 제출 이벤트
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // Todo: 내용이 비어있을 경우 게시글 작성 불가능 에러 알려주기
      try {
        await createPostAsync(formData)
        // 게시글 작성 성공 시 메인 페이지로 이동
        queryClient.refetchQueries({
          queryKey: ["emotionReport"],
          exact: false, // 정확히 일치하는 키가 없으면 모든 키를 참조
        })
        setIsSubmitCompleted(true)

        setTimeout(() => {
          toast.success("게시글이 작성되었습니다.")
          navigate("/main", { replace: true })
        }, 1000)
      } catch (error) {
        console.error(error)
        toast.error("게시글 작성에 실패했습니다.")
      }
    },
    [formData, createPostAsync, navigate],
  )

  // value 초기화
  const postFormStateValue = {
    currentStep,
    formData,
    isSubmitPending: isPending,
    emotionAnalysisData,
    isCurse,
    isSubmitCompleted,
  }
  const postFormActionValue = {
    updateStep,
    handleMapChange,
    updateFormData,
    handleSubmit,
    isFormDataValid,
    handleMusicChange,
    setEmotionAnalysisData,
    setIsCurse,
    handleIsSelected,
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
