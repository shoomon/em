import EmSection from "@/components/EmSection/EmSection"
import AgreementForm from "@/features/settings/components/TermsOfService/AgreementForm"
import useTermAgreement from "@/features/settings/hooks/useTermAgreement"
import { Navigate } from "react-router-dom"

import image from "@/assets/dance_bear.png"
import logo from "@/assets/em_logo.svg"
import EmLoading from "@/components/EmLoading/EmLoading"
const TermsAgreementPage = () => {
  const { data: isTermsAgreed, isPending } = useTermAgreement()

  if (isPending) {
    return <EmLoading className="w-full h-dvh" />
  }

  return !isPending && isTermsAgreed ? (
    <Navigate to="/main" replace />
  ) : (
    <div className="h-dvh w-full flex flex-col">
      <EmSection className="h-full py-16">
        <img src={logo} alt="logo" className="w-20" />
        <div className="flex items-center justify-between">
          <EmSection.Header
            title={
              <div className="flex flex-col items-start gap-2">
                <span className="text-xl">환영합니다!</span>
                <div className="flex flex-col text-em-black/60 text-base items-start text-md">
                  <span>아래 약관에 동의하시면</span>
                  <span>서비스를 이용할 수 있어요</span>
                </div>
              </div>
            }
          />
          <img src={image} alt="logo" className="w-26" />
        </div>
        <AgreementForm />
      </EmSection>
    </div>
  )
}

export default TermsAgreementPage
