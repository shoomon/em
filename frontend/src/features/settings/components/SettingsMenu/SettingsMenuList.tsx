import EmSection from "@/components/EmSection/EmSection"
import { BellIcon, SettingsIcon, UserIcon } from "lucide-react"
import SettingsMenuItem from "./SettingsMenuItem"

const SettingsMenuList = () => {
  const menuItems = [
    {
      label: "계정 관리",
      icon: <UserIcon className="size-full" />,
      to: "/mypage/account",
    },
    {
      label: "알림 설정",
      icon: <BellIcon className="size-full" />,
      to: "/mypage/notification",
    },
  ]
  return (
    <div className="p-4">
      <EmSection className="p-4" hasBorder hasRound>
        <EmSection.Header
          title={
            <div className="flex items-center gap-2">
              <SettingsIcon className="size-4" />
              <span>내 설정</span>
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
export default SettingsMenuList
