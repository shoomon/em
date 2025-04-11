import { memo, ReactNode, useMemo } from "react"
import { NavLink } from "react-router-dom"

interface NavigationBarItemProps {
  data: {
    id: number
    name: string
    icon: ReactNode
    path: string
  }
}

const NavigationBarItem = memo(({ data }: NavigationBarItemProps) => {
  const { id, path, name, icon } = data

  const content = useMemo(
    () => (
      <div className="flex flex-col items-center justify-center w-full gap-0.5">
        <span className="size-6">{icon}</span>
        <span className="text-xs font-semibold">{name}</span>
      </div>
    ),
    [icon, name],
  )

  return (
    <div className="flex-1">
      <NavLink
        to={path}
        key={id}
        viewTransition
        className={({ isActive }) =>
          isActive ? "text-em-black" : "text-em-gray"
        }>
        {content}
      </NavLink>
    </div>
  )
})

NavigationBarItem.displayName = "NavigationBarItem"

export default NavigationBarItem
