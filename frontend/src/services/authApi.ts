import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiEndpoints } from "../enums/enums"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: ApiEndpoints.login,
          method: "post",
          body,
        }
      },
    }),
  }),
})

export const { useLoginUserMutation } = authApi
