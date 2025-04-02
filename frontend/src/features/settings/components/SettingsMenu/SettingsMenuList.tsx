import EmSection from "@/components/EmSection/EmSection"
import { BellIcon, LockIcon, UserIcon } from "lucide-react"
import SettingsMenuItem from "./SettingsMenuItem"

interface SettingsMenuListProps {}

const SettingsMenuList = ({}: SettingsMenuListProps) => {
  const menuItems = [
    {
      label: "계정 관리",
      icon: <UserIcon className="size-full" />,
      to: "/mypage/account",
    },
    {
      label: "비밀번호 변경",
      icon: <LockIcon className="size-full" />,
      to: "/mypage/password",
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
        <EmSection.Header title="내 설정" />
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
