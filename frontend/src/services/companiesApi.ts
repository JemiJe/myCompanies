import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiEndpoints } from "../enums/enums"
import { getUserAuthHeader } from "../helpers/helpers"

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    // only for admin roles
    getAllCompanies: builder.mutation({
      query: () => {
        return {
          url: ApiEndpoints.companiesAll,
          headers: { ...getUserAuthHeader() },
          method: "get",
        }
      },
    }),
    getUserCompanies: builder.mutation({
      query: () => {
        return {
          url: ApiEndpoints.companies,
          headers: { ...getUserAuthHeader() },
          method: "get",
        }
      },
    }),
    getCompanyById: builder.mutation({
      query: (id) => {
        return {
          url: ApiEndpoints.companies + `/${id}`,
          headers: { ...getUserAuthHeader() },
          method: "get",
        }
      },
    }),
    deleteCompanyById: builder.mutation({
      query: (id) => {
        return {
          url: ApiEndpoints.companies + `/${id}`,
          headers: { ...getUserAuthHeader() },
          method: "delete",
        }
      },
    }),
    createCompany: builder.mutation({
      query: (body) => {
        return {
          url: ApiEndpoints.companies,
          headers: { ...getUserAuthHeader() },
          method: "post",
          body,
        }
      },
    }),
    updateCompanyById: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: ApiEndpoints.companies + `/${id}`,
          headers: { ...getUserAuthHeader() },
          method: "put",
          body,
        }
      },
    }),
  }),
})

export const {
  useGetAllCompaniesMutation,
  useGetUserCompaniesMutation,
  useGetCompanyByIdMutation,
  useDeleteCompanyByIdMutation,
  useCreateCompanyMutation,
  useUpdateCompanyByIdMutation,
} = companiesApi
