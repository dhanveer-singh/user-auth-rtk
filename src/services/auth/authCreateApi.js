import { createApi } from '@reduxjs/toolkit/query/react';

import customFetchBaseQuery from '../customFetchBaseQuery';
import APIS from '@/utils/constants/api-routes';

// Will store baseUrl in .env file later
const baseUrl = 'https://users-auth-mern.onrender.com';

export const apiService = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: APIS.AUTH.SIGNIN,
        method: 'POST',
        body: credentials,
      }),
    }),

    signup: builder.mutation({
      query: (userDetails) => ({
        url: APIS.AUTH.SIGNUP,
        method: 'POST',
        body: userDetails,
      }),
    }),

    getUsers: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: APIS.USERS.GET_USERS,
        method: 'GET',
        params: { page, limit },
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: APIS.USERS.MY_PROFILE,
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for using the endpoints in components
export const {
  useLoginMutation,
  useSignupMutation,
  useGetUsersQuery,
  useGetMeQuery,
} = apiService;
