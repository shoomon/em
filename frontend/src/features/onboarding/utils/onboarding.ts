export const hasSeenOnboarding = (): boolean =>
  localStorage.getItem("hasSeenOnboarding") === "true"

export const completeOnboarding = (): void =>
  localStorage.setItem("hasSeenOnboarding", "true")
