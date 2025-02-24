import { createApi } from '@reduxjs/toolkit/query/react';

import customFetchBaseQuery from '../customFetchBaseQuery';
import APIS from '@/utils/constants/api-routes';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const apiService = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBaseQuery({ baseUrl }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: APIS?.AUTH?.SIGNIN,
        method: 'POST',
        body: payload,
      }),
    }),

    signup: builder.mutation({
      query: (userDetails) => ({
        url: APIS?.AUTH?.SIGNUP,
        method: 'POST',
        body: userDetails,
      }),
    }),

    getUsers: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: APIS?.USERS?.GET_USERS,
        method: 'GET',
        params: { page, limit },
      }),
      providesTags: ['User'],
    }),

    getMe: builder.query({
      query: () => ({
        url: APIS?.USERS?.MY_PROFILE,
        method: 'GET',
      }),
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${APIS?.USERS?.DELETE_USER}/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export hooks for using the endpoints in components
export const {
  useLoginMutation,
  useSignupMutation,
  useGetUsersQuery,
  useGetMeQuery,
  useDeleteUserMutation,
} = apiService;
