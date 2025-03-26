import logo from "@/assets/em_logo_simple.svg"

const EmLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-em-white">
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
        <img src={logo} alt="로고" className="w-24 animate-bounce" />
      </div>
    </div>
  )
}
export default EmLoading
