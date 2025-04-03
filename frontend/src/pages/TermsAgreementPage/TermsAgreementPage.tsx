import EmSection from "@/components/EmSection/EmSection"
import AgreementForm from "@/features/settings/components/TermsOfService/AgreementForm"
import useTermAgreement from "@/features/settings/hooks/useTermAgreement"
import { Navigate } from "react-router-dom"

const TermsAgreementPage = () => {
  const { data: isTermsAgreed } = useTermAgreement()

  if (isTermsAgreed) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="h-dvh w-full flex flex-col">
      <EmSection className="h-full py-12">
        <EmSection.Header
          title={
            <div className="flex flex-col items-start gap-2">
              <span>환영합니다!</span>
              <span>아래 약관에 동의하시면</span>
              <span>서비스를 이용할 수 있습니다.</span>
            </div>
          }
        />
        <AgreementForm />
      </EmSection>
    </div>
  )
}

export default TermsAgreementPage
