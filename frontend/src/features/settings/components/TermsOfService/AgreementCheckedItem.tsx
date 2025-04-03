import Button from "@/components/Button/Button"
import { Square, SquareCheckBig } from "lucide-react"
import type { FC } from "react"
import { NavLink } from "react-router-dom"
import { Term, TermType } from "../../types/terms.type"

interface AgreementCheckedItemProps {
  isChecked: Record<TermType, boolean>
  term: Term
  onChecked: (type: TermType) => void
}

const AgreementCheckedItem: FC<AgreementCheckedItemProps> = ({
  isChecked,
  term,
  onChecked,
}) => {
  const { termId, title, content } = term

  const isEssential =
    termId === TermType.PRIVACY_POLICY ||
    termId === TermType.LOCATION_BASED_SERVICE

  return (
    <div className="flex items-center justify-between" key={termId}>
      <div className="flex items-center gap-2">
        <label
          htmlFor={`${termId}`}
          className="cursor-pointer"
          onClick={() => onChecked(termId as TermType)}>
          {isChecked[termId as TermType] ? (
            <SquareCheckBig className="size-5" />
          ) : (
            <Square className="size-5 " />
          )}
        </label>
        <input type="checkbox" id={`${termId}`} hidden />
        <span>{`${title} ${isEssential ? "(필수) *" : "(선택)"}`}</span>
      </div>
      <NavLink
        to={`/terms/${TermType[termId].toLowerCase()}`}
        state={{ title, content }}
        viewTransition>
        <Button variant="ghost" className="text-em-black/40">
          보기
        </Button>
      </NavLink>
    </div>
  )
}
export default AgreementCheckedItem
