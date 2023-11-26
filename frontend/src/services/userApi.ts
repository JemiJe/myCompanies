import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiEndpoints } from "../enums/enums"
import { getUserAuthHeader } from "../helpers/helpers"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.mutation({
      query: () => {
        return {
          url: ApiEndpoints.usersAll,
          headers: { ...getUserAuthHeader() },
          method: "get",
        }
      },
    }),
    getUserById: builder.mutation({
      query: (id) => {
        return {
          url: ApiEndpoints.users + `/${id}`,
          headers: { ...getUserAuthHeader() },
          method: "get",
        }
      },
    }),
    deleteUserById: builder.mutation({
      query: (id) => {
        return {
          url: ApiEndpoints.users + `/${id}`,
          headers: { ...getUserAuthHeader() },
          method: "delete",
        }
      },
    }),
    updateUserById: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: ApiEndpoints.users + `/${id}`,
          headers: { ...getUserAuthHeader() },
          method: "put",
          body,
        }
      },
    }),
  }),
})

export const {
  useGetAllUsersMutation,
  useGetUserByIdMutation,
  useDeleteUserByIdMutation,
  useUpdateUserByIdMutation,
} = userApi
