import { createBrowserRouter } from "react-router-dom"

import ProtectedRoute from "@/features/auth/components/ProtectedRoute"
import BlankLayout from "@/layout/BlankLayout"
import MainLayout from "@/layout/MainLayout"
import StackLayout from "@/layout/StackLayout"
import LoginPage from "@/pages/LoginPage/LoginPage"
import LoginSuccessPage from "@/pages/LoginSuccessPage/KakaoCallbackPage"
import MyPostListPage from "@/pages/MyPage/MyPostListPage"
import PostCreatePage from "@/pages/PostCreatePage/PostCreatePage"
import { lazy } from "react"
import CalendarPage from "@/pages/CalendarPage/CalendarPage"
import EmotionReportPage from "@/pages/EmotionReportPage/EmotionReportPage"
import RecommendPage from "@/pages/RecommendPage/RecommendPage"

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"))
const MyPage = lazy(() => import("@/pages/MyPage/MyPage"))

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
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
          {
            path: "/recommend",
            element: <RecommendPage />,
          },
          {
            path: "/emotion-report",
            element: <EmotionReportPage />,
          },
        ],
      },
      {
        element: <MainLayout hasHeader={false} />,
        children: [
          {
            path: "/mypage",
            element: <MyPage />,
          },
          {
            path: "/calendar",
            element: <CalendarPage />,
          },
        ],
      },
      {
        element: <StackLayout />,
        children: [
          {
            path: "/posts/create",
            element: <PostCreatePage />,
          },
          {
            path: "/mypage/list",
            element: <MyPostListPage />,
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
