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
  const { label, to } = settingsMenuItem
  return (
    <NavLink
      to={to}
      viewTransition
      className="justify-between gap-2 cursor-pointer flex items-center py-4 px-3 rounded-md   transition hover:bg-em-gray/30">
      <span>{label}</span>

      <ChevronRightIcon className="size-4" />
    </NavLink>
  )
}
export default SettingsMenuItem
