import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { showToast } from '@/utils/toast';

const customFetchBaseQuery = ({ baseUrl }) => {
  const baseQuery = fetchBaseQuery({ baseUrl });

  return async (args, api, extraOptions) => {
    const token = api?.getState()?.persistedReducer?.authSlice?.token;

    if (!args.headers) {
      args.headers = new Headers();
    }

    if (token) {
      args.headers.set('Authorization', `Bearer ${token}`);
    }

    try {
      const result = await baseQuery(args, api, extraOptions);
      console.log({result});
      
      if (result?.meta?.response?.ok) {
        return {
          data: {
            data: result?.data?.data || null,
            message: result?.data?.message || '',
            success: result?.data?.success || false,
          },
        };
      } else {
        if (!result?.error?.data?.errors?.fieldErrors) {
          showToast.error(result?.error?.data?.message);
        }

        return {
          data: {
            status: result?.error.status,
            data: result?.error?.data,
            fieldErrors: result?.error?.data?.errors?.fieldErrors,
          },
        };
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Unexpected error in API middleware:', error);
      return {
        error: {
          success: false,
          status: 500,
          message: 'Unexpected error occurred',
          error,
        },
      };
    }
  };
};

export default customFetchBaseQuery;
