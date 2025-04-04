import EmSection from "@/components/EmSection/EmSection"
import useStackLayoutStore from "@/store/useStackLayoutStore"
import { useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { useLocation } from "react-router-dom"
import remarkGfm from "remark-gfm"

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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-bold">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-bold">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-base font-bold">{children}</h4>
            ),
            h5: ({ children }) => (
              <h5 className="text-sm font-bold">{children}</h5>
            ),
            h6: ({ children }) => (
              <h6 className="text-xs font-bold">{children}</h6>
            ),
            table: ({ children }) => (
              <table className="w-full border-collapse border border-gray-300">
                {children}
              </table>
            ),
            td: ({ children }) => (
              <td className="border border-gray-300 p-2 text-center">
                {children}
              </td>
            ),
            th: ({ children }) => (
              <th className="border border-gray-300 p-2">{children}</th>
            ),
          }}>
          {content}
        </ReactMarkdown>
      </EmSection>
    </div>
  )
}

export default TermPage
