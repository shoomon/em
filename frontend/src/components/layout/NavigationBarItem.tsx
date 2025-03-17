import { ReactNode } from "react"
import { Link } from "react-router-dom"

interface NavigationBarItemProps {
  data: {
    id: number
    name: string
    icon: ReactNode
    path: string
  }
  isActive: boolean
}

const NavigationBarItem = ({ data, isActive }: NavigationBarItemProps) => {
  const { id, path, name, icon } = data

  return (
    <div className="flex-1" key={id}>
      <Link to={path} key={id}>
        <div className="flex flex-col items-center justify-center w-full gap-1">
          <span className={`size-5 ${isActive ? "text-em-black" : "text-em-gray"} `}>{icon}</span>
          <span className={`text-xs ${isActive ? "text-em-black" : "text-em-gray"} `}>{name}</span>
        </div>
      </Link>
    </div>
  )
}
export default NavigationBarItem
