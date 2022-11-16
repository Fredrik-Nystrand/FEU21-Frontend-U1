import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { SERVER_IP, SERVER_PORT } from "../../env"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_IP}:${SERVER_PORT}/api` }),
  tagTypes: ["issues", "issue", "User"],
  endpoints: (builder) => ({
    //Issues
    getIssues: builder.query({
      query: () => "/issue",
      providesTags: ["Issues"],
      transformResponse: (response) =>
        response.sort((a, b) => new Date(b.created) - new Date(a.created)),
    }),
    getIssue: builder.query({
      query: (id) => `/issue/${id}`,
      providesTags: ["Issue"],
    }),
    updateIssue: builder.mutation({
      query: (issue) => ({
        url: "/issue",
        method: "PUT",
        body: issue,
      }),
      invalidatesTags: ["Issue", "Issues"],
    }),
    addIssue: builder.mutation({
      query: (issue) => ({
        url: "/issue",
        method: "POST",
        body: issue,
      }),
      invalidatesTags: ["Issue", "Issues"],
    }),
    //Statuses
    getStatuses: builder.query({
      query: () => "/status",
    }),
    //Comments
    addComment: builder.mutation({
      query: (comment) => ({
        url: "/comment",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Issue"],
    }),
    //Customers
    loginCustomer: builder.mutation({
      query: (loginData) => ({
        url: "/customer/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["User"],
    }),
    addCustomer: builder.mutation({
      query: (registerData) => ({
        url: "/customer/create",
        method: "POST",
        body: registerData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const {
  useGetIssuesQuery,
  useGetIssueQuery,
  useGetStatusesQuery,
  useUpdateIssueMutation,
  useAddCommentMutation,
  useLoginCustomerMutation,
  useAddCustomerMutation,
  useAddIssueMutation,
} = apiSlice
