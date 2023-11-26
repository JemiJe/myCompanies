import { getUserFromLocalStorage } from "./helpers"

export const getUserAuthHeader = (): { Authorization: string } | null => {
  const { token } = getUserFromLocalStorage()
  return token ? { Authorization: "Bearer " + token } : null
}
