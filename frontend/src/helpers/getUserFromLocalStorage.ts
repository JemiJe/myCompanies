import { LOCAL_STORAGE_USER_DATA_KEY } from "../constants/constants"
import { authSliceInitialState } from "../features/constants/authSliceInitialState"

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY)
  return user ? JSON.parse(user) : authSliceInitialState
}
