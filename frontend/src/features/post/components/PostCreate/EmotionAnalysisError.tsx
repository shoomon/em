interface EmotionAnalysisErrorProps {}

const EmotionAnalysisError = ({}: EmotionAnalysisErrorProps) => {
  return (
    <div className="flex flex-col justify-center gap-2 items-center">
      <span className="flex py-3 text-sm flex-col bg-em-gray-sm px-6 rounded-2xl   gap-4 justify-center items-center">
        감정 분석에 문제가 발생했습니다 😭
      </span>
      <span className="text-em-black/60 text-sm">
        아래에서 직접 감정을 선택해주세요.
      </span>
    </div>
  )
}
export default EmotionAnalysisError
