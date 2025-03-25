import { createBrowserRouter } from "react-router-dom"

import BlankLayout from "@/layout/BlankLayout"
import MainLayout from "@/layout/MainLayout"
import StackLayout from "@/layout/StackLayout"
import HomePage from "@/pages/HomePage/HomePage"
import LoginPage from "@/pages/LoginPage/LoginPage"
import LoginSuccessPage from "@/pages/LoginSuccessPage/KakaoCallbackPage"
import PostCreatePage from "@/pages/PostCreatePage/PostCreatePage"

const router = createBrowserRouter([
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
        path: "/mypage",
        element: <div>/mypage</div>,
        children: [
          {
            path: "history",
            element: <div>/mypage/history</div>,
          },
          {
            path: "report",
            element: <div>/mypage/report</div>,
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
    element: <StackLayout />,
    children: [
      {
        path: "/posts/create",
        element: <PostCreatePage />,
      },
      {
        path: "/mypage",
        element: <div>/mypage</div>,
        children: [
          {
            path: "history/:date",
            element: <div>/mypage/history/:date</div>,
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
