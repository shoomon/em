import Button from "@/components/Button/Button"
import { Square, SquareCheckBig } from "lucide-react"
import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import useGetTermsQuery from "../../hooks/useGetTermsQuery"
import useUpdateTerm from "../../hooks/useUpdateTerm"
import { TermType, UpdateTermKey } from "../../types/terms.type"
import AgreementCheckedItem from "./AgreementCheckedItem"

const AgreementForm = () => {
  const { data: terms } = useGetTermsQuery()

  const { mutateAsync: updateTermAgreement } = useUpdateTerm()

  const navigate = useNavigate()

  const [isAllChecked, setIsAllChecked] = useState(false)
  const [isChecked, setIsChecked] = useState<Record<TermType, boolean>>({
    [TermType.PRIVACY_POLICY]: false,
    [TermType.LOCATION_BASED_SERVICE]: false,
    [TermType.MARKETING_NOTIFICATION]: false,
    // [TermType.TERMS_OF_SERVICE]: false,
  })

  // 필수 동의 여부
  const isEssential =
    isChecked[TermType.PRIVACY_POLICY] &&
    isChecked[TermType.LOCATION_BASED_SERVICE]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { isTermsAgreed } = await updateTermAgreement({
        [UpdateTermKey.PRIVACY_POLICY]: isChecked[TermType.PRIVACY_POLICY],
        [UpdateTermKey.LOCATION_BASED_SERVICE]:
          isChecked[TermType.LOCATION_BASED_SERVICE],
        [UpdateTermKey.MARKETING_NOTIFICATION]:
          isChecked[TermType.MARKETING_NOTIFICATION],
      })

      if (isTermsAgreed) {
        navigate("/main", { replace: true })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChecked = (type: TermType | "all") => {
    switch (type) {
      case "all":
        setIsAllChecked(!isAllChecked)
        setIsChecked((prev) => ({
          ...prev,
          [TermType.PRIVACY_POLICY]: !isAllChecked,
          [TermType.LOCATION_BASED_SERVICE]: !isAllChecked,
          [TermType.MARKETING_NOTIFICATION]: !isAllChecked,
          // [TermType.TERMS_OF_SERVICE]: !isAllChecked,
        }))
        break
      default:
        isAllChecked && setIsAllChecked(false)
        setIsChecked((prev) => ({ ...prev, [type]: !prev[type] }))
    }
  }

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={handleSubmit}>
      <section className="flex-1">
        <div className="flex flex-col gap-4">
          <div className="border-b py-4 border-em-gray">
            <div className="flex items-center gap-2 font-extrabold">
              <label
                onClick={() => handleChecked("all")}
                htmlFor="all"
                className="cursor-pointer">
                {isAllChecked ? (
                  <SquareCheckBig className="size-5" />
                ) : (
                  <Square className="size-5 " />
                )}
              </label>
              <input type="checkbox" id="all" className="hidden" />
              <span>전체 동의</span>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {terms
              ?.sort((a, b) => a.termId - b.termId)
              ?.map((term) => {
                return (
                  <AgreementCheckedItem
                    isChecked={isChecked}
                    onChecked={handleChecked}
                    key={term.termId}
                    term={term}
                  />
                )
              })}
          </div>
        </div>
      </section>
      <Button
        disabled={!isEssential}
        variant={isEssential ? "default" : "disabled"}
        type="submit">
        시작하기
      </Button>
    </form>
  )
}

export default AgreementForm
