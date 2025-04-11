import { ChevronRightIcon } from "lucide-react"
import { ReactNode } from "react"

interface SettingsMenuItemProps {
  settingsMenuItem: {
    label: string
    icon: ReactNode
    to: string
  }
}

const SettingsMenuItem = ({ settingsMenuItem }: SettingsMenuItemProps) => {
  const { label } = settingsMenuItem
  return (
    // <NavLink
    //   to={to}
    //   viewTransition
    <div className="justify-between gap-2 cursor-pointer flex items-center py-4 px-3 rounded-md   transition hover:bg-em-gray/30">
      <span>{label}</span>
      <ChevronRightIcon className="size-4" />
    </div>
    // </NavLink>
  )
}
export default SettingsMenuItem
