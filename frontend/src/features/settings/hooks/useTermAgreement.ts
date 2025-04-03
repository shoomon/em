import { useQuery } from "@tanstack/react-query"
import { fetchTermAgreement } from "../api/term"

const useTermAgreement = () => {
  const accessToken = localStorage.getItem("accessToken")

  return useQuery({
    queryKey: ["termAgreement"],
    queryFn: fetchTermAgreement,
    enabled: !!accessToken,
    staleTime: 0, // 데이터를 캐시에 저장하지 않음
    gcTime: 0, // 데이터를 캐시에 저장하지 않음
    select: (data) => data.isTermsAgreed,
  })
}

export default useTermAgreement
