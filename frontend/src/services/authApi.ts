import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiEndpoints } from "../enums/enums"
import { UserSignInReqDto, UserSignUpReqDto } from "../dto/dto"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: UserSignInReqDto) => {
        return {
          url: ApiEndpoints.login,
          method: "post",
          body,
        }
      },
    }),
    signUpUser: builder.mutation({
      query: (body: UserSignUpReqDto) => {
        return {
          url: ApiEndpoints.signUp,
          method: "post",
          body,
        }
      },
    }),
  }),
})

export const { useLoginUserMutation, useSignUpUserMutation } = authApi
