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
      <label
        htmlFor={`${termId}`}
        className="cursor-pointer flex items-center gap-2"
        onClick={() => onChecked(termId as TermType)}>
        {isChecked[termId as TermType] ? (
          <SquareCheckBig className="size-5" />
        ) : (
          <Square className="size-5 " />
        )}
        <div className="flex items-center gap-1 justify-center">
          <span>{title}</span>
          {isEssential ? (
            <>
              <span>(필수)</span>
              <span className="text-rose-500">*</span>
            </>
          ) : (
            <span>(선택)</span>
          )}
        </div>
      </label>
      <input type="checkbox" id={`${termId}`} hidden />
      <NavLink
        to={`/terms/${TermType[termId].toLowerCase()}`}
        state={{ title, content }}
        viewTransition>
        <Button variant="ghost" className="p-0 text-sm text-em-black/40">
          보기
        </Button>
      </NavLink>
    </div>
  )
}
export default AgreementCheckedItem
