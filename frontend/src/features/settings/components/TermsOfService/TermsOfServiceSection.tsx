import EmSection from "@/components/EmSection/EmSection"
import { BookOpenIcon } from "lucide-react"
import { TermType } from "../../types/terms.type"
import TermMenuItem from "./TermMenuItem"

interface TermsOfServiceSectionProps {}

const TermsOfServiceSection = ({}: TermsOfServiceSectionProps) => {
  const menuItems = [
    {
      label: "위치기반 서비스 이용 약관",
      type: TermType.LOCATION_BASED_SERVICE,
    },
    {
      label: "개인정보 처리 방침",
      type: TermType.PRIVACY_POLICY,
    },
    {
      label: "마케팅 알림 수신 동의",
      type: TermType.MARKETING_NOTIFICATION,
    },
  ]
  return (
    <div className="p-4">
      <EmSection className="p-4" hasBorder hasRound>
        <EmSection.Header
          title={
            <div className="flex items-center gap-2">
              <BookOpenIcon className="size-4" />
              <span>약관 및 정책</span>
            </div>
          }
        />
        <ul className="flex flex-col gap-3 mt-2">
          {menuItems.map((item) => {
            return <TermMenuItem key={item.label} settingsMenuItem={item} />
          })}
        </ul>
      </EmSection>
    </div>
  )
}
export default TermsOfServiceSection
