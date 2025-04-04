export enum TermType {
  PRIVACY_POLICY = 1,
  LOCATION_BASED_SERVICE = 2,
  MARKETING_NOTIFICATION = 3,
  // TERMS_OF_SERVICE = 4,
}

export enum UpdateTermKey {
  PRIVACY_POLICY = "isPersonalInfoConsented",
  LOCATION_BASED_SERVICE = "isLocationInfoConsented",
  MARKETING_NOTIFICATION = "isAllowingMarketing",
}

export interface Term {
  termId: number
  title: string
  content: string
}

export type TermTypeKey =
  | "PRIVACY_POLICY"
  | "LOCATION_BASED_SERVICE"
  | "MARKETING_NOTIFICATION"
// | "TERMS_OF_SERVICE"

export interface IsTermsAgreedResponse {
  isTermsAgreed: boolean
}

export interface UpdateTermAgreementRequest {
  [UpdateTermKey.PRIVACY_POLICY]: boolean
  [UpdateTermKey.LOCATION_BASED_SERVICE]: boolean
  [UpdateTermKey.MARKETING_NOTIFICATION]: boolean
}
