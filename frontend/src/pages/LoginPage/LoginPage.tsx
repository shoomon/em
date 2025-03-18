import logo from "@/assets/em_logo_simple.svg"
import kakaoIcon from "@/assets/kakao_icon.svg"
import Button from "@/components/Button/Button"

const LoginPage = () => {
  const loginProviders = [
    {
      id: 1,
      name: "카카오",
      image: kakaoIcon,
      backgroundColor: "#FEE500",
      onClick: () => {
        console.log("카카오 로그인")
      },
    },
  ]
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-em-white">
      <section className="flex flex-col items-center justify-center flex-1 gap-3">
        <img src={logo} alt="로고" className="w-24 animate-pulse" />
        <div className="flex flex-col items-center justify-center gap-1 text-center text-em-gray">
          <span>지금 당신이 계신 곳에</span>
          <span>다양한 속마음 확인해보세요.</span>
        </div>
      </section>
      <section className="flex flex-col items-center justify-start w-full gap-4 px-10 py-8 basis-1/5">
        <div className="flex flex-col items-center justify-center w-full gap-2">
          {loginProviders.map(({ id, name, image, onClick, backgroundColor }) => (
            <button
              key={id}
              onClick={onClick}
              className={`rounded-xl py-3 flex items-center justify-center bg-[${backgroundColor}] hover:bg-[${backgroundColor}/70] w-full gap-2 cursor-pointer text-em-black`}>
              <img src={image} alt={name} className="w-8" />
              <span className="text-base font-semibold">{name}로 시작하기</span>
            </button>
          ))}
        </div>
        <span className="text-sm text-em-gray">ⓒ 2025. em All rights reserved</span>
      </section>
    </div>
  )
}
export default LoginPage
