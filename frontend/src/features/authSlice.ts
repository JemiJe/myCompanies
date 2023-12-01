import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { LOCAL_STORAGE_USER_DATA_KEY } from "../constants/constants"
import { UserAuthRespDto } from "../dto/userAuthRespDto"
import { authSliceInitialState } from "./constants/authSliceInitialState"

const initialState = authSliceInitialState

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserAuthRespDto>) => {
      localStorage.setItem(
        LOCAL_STORAGE_USER_DATA_KEY,
        JSON.stringify(action.payload),
      )
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY)
      state.user = initialState.user
      state.token = initialState.token
    },
  },
})

export const selectAuth = (state: RootState) => state.auth
export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
