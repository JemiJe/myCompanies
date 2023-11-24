import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { LOCAL_STORAGE_USER_DATA_KEY } from "../constants/constants"
import { UserAuthRespDto } from "../dto/userAuthRespDto"

const initialState: UserAuthRespDto = {
  user: null,
  token: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserAuthRespDto>) => {
      localStorage.setItem(
        LOCAL_STORAGE_USER_DATA_KEY,
        action.payload.token as string,
      )
      state.user = action.payload.user
      state.token = action.payload.token
    },
  },
})

export const selectAuth = (state: RootState) => state.auth
export const { setUser } = authSlice.actions
export default authSlice.reducer
