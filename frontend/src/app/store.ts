import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "../services/authApi"
import { userApi } from "../services/userApi"
import { companiesApi } from "../services/companiesApi"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import { errorHandler } from "../middlewares/middlewares"
import authReducer from "../features/authSlice"
import companiesReducer from "../features/companiesSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    companies: companiesReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    errorHandler,
    ...getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      companiesApi.middleware,
    ),
  ],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
