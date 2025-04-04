import { useMutation } from "@tanstack/react-query"
import { updateTermAgreement } from "../api/termApi"
import { UpdateTermAgreementRequest } from "../types/terms.type"

const useUpdateTerm = () => {
  return useMutation({
    mutationFn: (data: UpdateTermAgreementRequest) => updateTermAgreement(data),
  })
}

export default useUpdateTerm
