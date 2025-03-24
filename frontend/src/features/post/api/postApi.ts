import apiClient from "@/utils/http-common"
import { PostRequest } from "../types/post"

export const fetchPostCreate = (postRequest: PostRequest) => {
  return apiClient.post("/posts/", postRequest)
}

export const fetchPostDelete = (id: number) => {
  return apiClient.delete(`/posts/${id}`)
}

export const fetchPostList = async () => {
  const response = await apiClient.get("/posts/")
  return response.data
}
