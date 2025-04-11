import { createContext, ReactNode, useState } from "react"
import MusicPlayer from "../components/MusicPlayer"
import useYoutubeSearch from "../hooks/useYoutubeSearch"

export const YoutubeStateContext = createContext<string>("")
export const YoutubeDispatchContext = createContext<
  ((newQuery: string) => void) | undefined
>(undefined)

interface YoutubeProviderProps {
  children?: ReactNode
}

const YoutubeProvider = ({ children }: YoutubeProviderProps) => {
  const [query, setQuery] = useState<string>("")
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false)
  const { data } = useYoutubeSearch(query)

  const handleQuery = (newQuery: string) => {
    setQuery(newQuery)
    setIsPlayerOpen(true)
  }

  return (
    <YoutubeStateContext value={query}>
      <YoutubeDispatchContext value={handleQuery}>
        {children}
        {isPlayerOpen && (
          <MusicPlayer
            videoId={data?.items[0].id.videoId}
            onClose={() => setIsPlayerOpen(false)}
          />
        )}
      </YoutubeDispatchContext>
    </YoutubeStateContext>
  )
}

export default YoutubeProvider
