import { createBrowserRouter } from "react-router-dom"

import ProtectedRoute from "@/features/auth/components/ProtectedRoute"
import BlankLayout from "@/layout/BlankLayout"
import MainLayout from "@/layout/MainLayout"
import StackLayout from "@/layout/StackLayout"
import LoginPage from "@/pages/LoginPage/LoginPage"
import LoginSuccessPage from "@/pages/LoginSuccessPage/KakaoCallbackPage"
import PostCreatePage from "@/pages/PostCreatePage/PostCreatePage"
import { lazy } from "react"

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"))
const MyPage = lazy(() => import("@/pages/MyPage/MyPage"))

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/onboard",
            element: <div>/</div>,
          },
          // 개발의 편의를 위해 온보딩 페이지 구현전까지 홈 페이지의 path를 /로 사용
          {
            path: "/",
            element: <HomePage />,
          },
        ],
      },
      {
        path: "*",
        element: <div>404 Not Found</div>,
      },
    ],
  },
  {
    element: <MainLayout hasHeader={false} />,
    children: [
      {
        path: "/mypage",
        element: <MyPage />,
        children: [
          {
            path: "history",
            element: <div>/mypage/history</div>,
            children: [
              {
                path: ":date",
                element: <div>/mypage/history/:date</div>,
              },
            ],
          },
          {
            path: "report",
            element: <div>/mypage/report</div>,
          },
        ],
      },
    ],
  },
  {
    element: <StackLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/posts/create",
            element: <PostCreatePage />,
          },
        ],
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/login-success",
        element: <LoginSuccessPage />,
      },
    ],
  },
])

export default router
