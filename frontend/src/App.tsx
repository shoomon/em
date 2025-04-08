import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"

import router from "@/routes/router"
import YoutubeProvider from "./features/music/contexts/YoutubeContext"
import { Suspense } from "react"
import EmLoading from "./components/EmLoading/EmLoading"

const queryClient = new QueryClient()

const App = () => {
  return (
    <Suspense fallback={<EmLoading className="w-full h-dvh" />}>
      <QueryClientProvider client={queryClient}>
        <YoutubeProvider>
          <RouterProvider router={router} />
        </YoutubeProvider>
      </QueryClientProvider>
    </Suspense>
  )
}

export default App
