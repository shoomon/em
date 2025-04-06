import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"

import router from "@/routes/router"
import YoutubeProvider from "./features/music/contexts/YoutubeContext"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <YoutubeProvider>
        <RouterProvider router={router} />
      </YoutubeProvider>
    </QueryClientProvider>
  )
}

export default App
