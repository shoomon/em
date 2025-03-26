import apiClient from "@/utils/http-common"
import toQueryString from "@/utils/toQueryString"
import {
  ClusteredPostListRequest,
  PointListRequest,
  PostCreateRequest,
  PostListRequest,
} from "../types/post"

export const fetchPostCreate = (postCreateRequest: PostCreateRequest) => {
  return apiClient.post("/posts/", postCreateRequest)
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
  return response.data
}
