interface LoginButtonProps {
  data: {
    id: number
    name: string
    image: string
    onClick: () => void
    backgroundColor: string
  }
}

const LoginButton = ({ data }: LoginButtonProps) => {
  const { id, name, image, onClick, backgroundColor } = data

  return (
    <button
      key={id}
      onClick={onClick}
      style={{ backgroundColor }}
      className={`rounded-xl py-3 flex items-center justify-center bg-[${backgroundColor}]  w-full gap-2 cursor-pointer text-em-black`}>
      <img src={image} alt={name} className="w-8" />
      <span className="text-base font-semibold">{name}로 시작하기</span>
    </button>
  )
}
export default LoginButton
