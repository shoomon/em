import axios from "axios"
import { PostCreateResponse } from "../types/post"

// 게시글 작성
export const fetchPostCreate = async (data: PostCreateResponse) => {
  const response = await axios.post("/api/posts", data)
  return response.data
}
