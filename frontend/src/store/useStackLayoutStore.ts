import { create } from "zustand"

interface StackLayoutStore {
  title: string
  setTitle: (title: string) => void
}

const useStackLayoutStore = create<StackLayoutStore>((set) => ({
  title: "",
  setTitle: (title) => set({ title }),
}))

export default useStackLayoutStore
