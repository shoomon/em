import { createBrowserRouter } from "react-router-dom"

import ProtectedRoute from "@/features/auth/components/ProtectedRoute"
import BlankLayout from "@/layout/BlankLayout"
import FullScreenLayout from "@/layout/FullScreenLayout"
import MainLayout from "@/layout/MainLayout"
import StackLayout from "@/layout/StackLayout"
import { lazy } from "react"

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"))
const MyPage = lazy(() => import("@/pages/MyPage/MyPage"))
const RecommendPage = lazy(() => import("@/pages/RecommendPage/RecommendPage"))
const EmotionReportPage = lazy(
  () => import("@/pages/EmotionReportPage/EmotionReportPage"),
)
const CalendarPage = lazy(() => import("@/pages/CalendarPage/CalendarPage"))
const PostCreatePage = lazy(
  () => import("@/pages/PostCreatePage/PostCreatePage"),
)
const MyPostListPage = lazy(() => import("@/pages/MyPage/MyPostListPage"))
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage/NotFoundPage"))
const TermPage = lazy(() => import("@/pages/Term/TermPage"))
const TermsAgreementPage = lazy(
  () => import("@/pages/TermsAgreementPage/TermsAgreementPage"),
)
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"))
const LoginSuccessPage = lazy(
  () => import("@/pages/LoginSuccessPage/LoginSuccessPage"),
)

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
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/terms-agreement",
        element: <TermsAgreementPage />,
      },
      {
        element: <FullScreenLayout />,
        children: [
          {
            path: "/terms/:type",
            element: <TermPage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
])

export default router
