import { createBrowserRouter } from "react-router-dom"

import MainLayout from "@/layout/MainLayout"
import StackLayout from "@/layout/StackLayout"
import HomePage from "@/pages/HomePage"

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
        children: [
          {
            path: "posts",
            element: <div>/home/posts</div>,
          },
          {
            path: "posts/:clusterId",
            element: <div>/home/posts/:clusterId</div>,
          },
        ],
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
        path: "/",
        element: <div>/home</div>,
        children: [
          {
            path: "posts/new",
            element: <div>/home/new</div>,
          },
        ],
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
])

export default router
