import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customFetchBaseQuery = ({ baseUrl }) => {
  const baseQuery = fetchBaseQuery({ baseUrl });

  return async (args, api, extraOptions) => {
    const token = api?.getState()?.authSlice?.token;

    if (!args.headers) {
      args.headers = new Headers();
    }

    if (token) {
      args.headers.set('Authorization', `Bearer ${token}`);
    }

    try {
      const result = await baseQuery(args, api, extraOptions);

      if (result.meta?.response?.ok) {
        // This check is for weather the HTTP request itself was successful.
        // This means the HTTP request was successful (status code 2xx)

        if (result?.data?.success) {
          return {
            data: {
              data: result?.data?.data,
              message: result.data.message,
              success: true,
            },
          };
        }
      } else {
        return {
          data: {
            success: false,
            formFieldErrors: result?.error?.data?.formFieldErrors,
            errors: result?.error?.data?.errors,
            message: result?.error?.data?.message,
          },
        };
      }

      // Handle HTTP Error (non-2xx status codes)
      const customErrorResponse = {
        success: false,
        status: result.error?.originalStatus || 500,
        message: result.error?.data?.message || 'Something went wrong',
      };

      return { error: customErrorResponse };
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
