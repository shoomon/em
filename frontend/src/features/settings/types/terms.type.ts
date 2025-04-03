export enum TermType {
  PRIVACY_POLICY = 1,
  LOCATION_BASED_SERVICE = 2,
  MARKETING_NOTIFICATION = 3,
  // TERMS_OF_SERVICE = 4,
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
