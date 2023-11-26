import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "../services/authApi"
import { userApi } from "../services/userApi"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import { errorHandler } from "../middlewares/middlewares"
import authReducer from "../features/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    errorHandler,
    ...getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
  ],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
