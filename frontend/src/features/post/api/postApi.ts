import apiClient from "@/utils/http-common"
import toQueryString from "@/utils/toQueryString"
import {
  ClusteredPostListRequest,
  PointListRequest,
  PostListRequest,
  PostCreateRequest
} from "../types/post"

// 게시글 작성
export const fetchPostCreate = async (data: PostCreateRequest) => {
  const response = await apiClient.post("/api/posts", data)
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

export const fetchPostClusteredList = async (
  clusteredPostListRequest: ClusteredPostListRequest,
) => {
  const queryString = toQueryString({ ...clusteredPostListRequest })
  const response = await apiClient.get(`/posts/set?${queryString}`)
  return response.data
}

export const fetchPointList = async (pointListRequest: PointListRequest) => {
  const queryString = toQueryString({ ...pointListRequest })
  const response = await apiClient.get(`/posts/points?${queryString}`)
}
