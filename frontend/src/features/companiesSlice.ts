import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { CompanyByIdRespDto } from "../dto/dto"
import { companiesSliceInitialState } from "./constants/companiesSliceInitialState"

const initialState = companiesSliceInitialState

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<CompanyByIdRespDto[]>) => {
      state.companies = action.payload.length > 0 ? [...action.payload] : null
    },
    clearCompanies: (state) => {
      state.companies = initialState.companies
    },
  },
})

export const selectCompanies = (state: RootState) => state.companies
export const { setCompanies, clearCompanies } = companiesSlice.actions
export default companiesSlice.reducer
