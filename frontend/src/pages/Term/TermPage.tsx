import EmSection from "@/components/EmSection/EmSection"
import useStackLayoutStore from "@/store/useStackLayoutStore"
import { useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { useLocation } from "react-router-dom"

const TermPage = () => {
  const setTitle = useStackLayoutStore((state) => state.setTitle)
  const location = useLocation()

  const { title, content } = location.state as {
    title: string
    content: string
  }

  useEffect(() => {
    setTitle(title)
  }, [])

  return (
    <div className="h-100vh w-full flex flex-col">
      <EmSection>
        <ReactMarkdown>{content}</ReactMarkdown>
      </EmSection>
    </div>
  )
}

export default TermPage
