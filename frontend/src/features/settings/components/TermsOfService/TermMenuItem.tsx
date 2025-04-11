import { ChevronRightIcon } from "lucide-react"
import { NavLink } from "react-router-dom"
import useGetTermQuery from "../../hooks/useGetTermQuery"
import { TermType } from "../../types/terms.type"

interface TermMenuItemProps {
  settingsMenuItem: {
    label: string
    type: TermType
  }
}

const TermMenuItem = ({ settingsMenuItem }: TermMenuItemProps) => {
  const { label, type } = settingsMenuItem

  const { data: term } = useGetTermQuery(type)

  return (
    <NavLink
      to={`/terms/${type}`}
      state={{ title: term?.title, content: term?.content }}
      viewTransition
      className="cursor-pointer flex items-center py-4 px-3 rounded-md justify-between transition hover:bg-em-gray/30">
      <span>{label}</span>
      <ChevronRightIcon className="size-4" />
    </NavLink>
  )
}
export default TermMenuItem
