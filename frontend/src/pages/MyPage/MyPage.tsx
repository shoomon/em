import LogoutText from "@/features/auth/components/LogoutText"
import UserProfileCard from "@/features/profile/components/UserProfileCard"
import SettingsMenuSection from "@/features/settings/components/SettingsMenu/SettingsMenuList"
import TermsOfServiceSection from "@/features/settings/components/TermsOfService/TermsOfServiceSection"

const MyPage = () => {
  return (
    <div className="flex flex-col flex-1">
      <section className="p-4 flex flex-col gap-6 relative">
        <UserProfileCard />
      </section>
      {/* 계정 관리 */}
      <SettingsMenuSection />
      <TermsOfServiceSection />
      {/* {renderTabContent()} */}
      <div className="flex flex-1 justify-end items-end h-full p-4">
        <LogoutText />
      </div>
    </div>
  )
}

export default MyPage
