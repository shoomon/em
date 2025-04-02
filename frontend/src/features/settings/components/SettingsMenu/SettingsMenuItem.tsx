import { ChevronRightIcon } from "lucide-react"
import { ReactNode } from "react"
import { NavLink } from "react-router-dom"

interface SettingsMenuItemProps {
  settingsMenuItem: {
    label: string
    icon: ReactNode
    to: string
  }
}

const SettingsMenuItem = ({ settingsMenuItem }: SettingsMenuItemProps) => {
  const { label, icon, to } = settingsMenuItem
  return (
    <li className="cursor-pointer flex items-center py-4 px-3 rounded-md justify-between transition hover:bg-em-gray">
      <NavLink
        to={to}
        viewTransition
        className="flex items-center justify-center gap-2">
        <span className="size-5">{icon}</span>
        <span>{label}</span>
      </NavLink>
      <ChevronRightIcon className="w-4 h-4" />
    </li>
  )
}
export default SettingsMenuItem
