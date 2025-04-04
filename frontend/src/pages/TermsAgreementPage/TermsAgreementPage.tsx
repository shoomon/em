import EmSection from "@/components/EmSection/EmSection"
import AgreementForm from "@/features/settings/components/TermsOfService/AgreementForm"
import useTermAgreement from "@/features/settings/hooks/useTermAgreement"
import { Navigate } from "react-router-dom"

import logo from "@/assets/em_logo.svg"
import image from "@/assets/music_bear.png"
const TermsAgreementPage = () => {
  const { data: isTermsAgreed } = useTermAgreement()

  if (isTermsAgreed) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="h-dvh w-full flex flex-col">
      <EmSection className="h-full py-16">
        <img src={logo} alt="logo" className="w-20" />
        <div className="flex items-center justify-between">
          <EmSection.Header
            title={
              <div className="flex flex-col items-start gap-2">
                <span>환영합니다!</span>
                <span>아래 약관에 동의하시면</span>
                <span>서비스를 이용할 수 있어요</span>
              </div>
            }
          />
          <img src={image} alt="logo" className="w-20" />
        </div>
        <AgreementForm />
      </EmSection>
    </div>
  )
}

export default TermsAgreementPage
