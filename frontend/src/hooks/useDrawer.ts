import { useEffect } from "react"

interface UseDrawerProps {
  drawerKey: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const useDrawer = ({ drawerKey, isOpen, setIsOpen }: UseDrawerProps) => {
  useEffect(() => {
    const handlePopstate = () => {
      setIsOpen(false)
    }

    window.addEventListener("popstate", handlePopstate)
    return () => {
      window.removeEventListener("popstate", handlePopstate)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      history.pushState({ drawerKey }, "", window.location.pathname)
    } else {
      if (history.state.drawerKey === drawerKey) {
        history.back()
      }
    }
  }, [isOpen])

  return { isOpen, setIsOpen }
}

export default useDrawer
