import EmSection from "@/components/EmSection/EmSection"
import SettingsMenuItem from "@/features/settings/components/SettingsMenu/SettingsMenuItem"
import { BookOpenIcon } from "lucide-react"

interface TermsOfServiceSectionProps {}

const TermsOfServiceSection = ({}: TermsOfServiceSectionProps) => {
  const menuItems = [
    {
      label: "이음 이용 약관",
      icon: <BookOpenIcon className="size-full" />,
      to: "/mypage/terms-of-service",
    },
    {
      label: "위치기반 서비스 이용 약관",
      icon: <BookOpenIcon className="size-full" />,
      to: "/mypage/terms-of-service",
    },
    {
      label: "개인정보 처리 방침",
      icon: <BookOpenIcon className="size-full" />,
      to: "/mypage/privacy-policy",
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
            return <SettingsMenuItem key={item.label} settingsMenuItem={item} />
          })}
        </ul>
      </EmSection>
    </div>
  )
}
export default TermsOfServiceSection
