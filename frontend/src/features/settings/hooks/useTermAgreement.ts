import { useQuery } from "@tanstack/react-query"
import { fetchTermAgreementCheck } from "../api/termApi"

const useTermAgreement = () => {
  const accessToken = localStorage.getItem("accessToken")

  return useQuery({
    queryKey: ["termAgreement"],
    queryFn: fetchTermAgreementCheck,
    enabled: !!accessToken,
    staleTime: 0, // 데이터를 캐시에 저장하지 않음
    gcTime: 0, // 데이터를 캐시에 저장하지 않음
    select: (data) => data.isTermsAgreed,
  })
}

export default useTermAgreement
