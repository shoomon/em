import apiClient from "@/utils/http-common"
import { Profile } from "../types/Profile"

export const fetchProfile = async (): Promise<Profile> => {
  const response = await apiClient.get("/users")
  return response.data
}
