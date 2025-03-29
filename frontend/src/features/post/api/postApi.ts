import apiClient from "@/utils/http-common"
import toQueryString from "@/utils/toQueryString"
import {
  PointListRequest,
  PostCreateRequest,
  PostListRequest,
} from "../types/post"

// 게시글 작성
export const fetchPostCreate = async (data: PostCreateRequest) => {
  const response = await apiClient.post("/posts", data)
  return response.data
}

export const fetchPostDelete = (id: number) => {
  return apiClient.delete(`/posts/${id}`)
}

export const fetchPostList = async (postListRequest: PostListRequest) => {
  const queryString = toQueryString({ ...postListRequest })
  const response = await apiClient.get(`/posts?${queryString}`)
  return response.data
}

export const fetchPost = async (postId: number) => {
  const response = await apiClient.get(`/posts/${postId}`)
  return response.data
}

export const fetchPointList = async (pointListRequest: PointListRequest) => {
  const queryString = toQueryString({ ...pointListRequest })
  const response = await apiClient.get(`/posts/points?${queryString}`)
  return response.data
}

export const fetchPostReaction = (postId: number, emotionName: string) => {
  return apiClient.post(`/reactions/${postId}`, { emotionName })
}
