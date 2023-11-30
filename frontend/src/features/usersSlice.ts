import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { UsersAllRespDto } from "../dto/dto"
import { usersInitialState } from "./constants/usersInitialState"

const initialState = usersInitialState

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UsersAllRespDto>) => {
      state.usersAll = action.payload.length > 0 ? [...action.payload] : null
    },
    clearUsers: (state) => {
      state.usersAll = initialState.usersAll
    },
  },
})

export const selectUsers = (state: RootState) => state.users
export const { setUsers, clearUsers } = usersSlice.actions
export default usersSlice.reducer
