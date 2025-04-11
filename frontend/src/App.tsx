import router from "@/routes/router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"
import EmLoading from "./components/EmLoading/EmLoading"
import YoutubeProvider from "./features/music/contexts/YoutubeContext"

const queryClient = new QueryClient()

const App = () => {
  return (
    <Suspense fallback={<EmLoading className="w-full h-dvh" />}>
      <QueryClientProvider client={queryClient}>
        <YoutubeProvider>
          <Toaster richColors position="top-center" offset={{ top: "24px" }} />
          <RouterProvider router={router} />
        </YoutubeProvider>
      </QueryClientProvider>
    </Suspense>
  )
}

export default App
