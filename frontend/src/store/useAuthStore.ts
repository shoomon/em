import { create } from "zustand"

interface AuthStore {
  isLoggedIn: boolean
  accessToken: string | null
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setAccessToken: (accessToken: string) => void
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setAccessToken: (accessToken: string) => set({ accessToken }),
}))

export default useAuthStore
