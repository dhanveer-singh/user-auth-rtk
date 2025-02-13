import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customFetchBaseQuery = ({ baseUrl }) => {
  const baseQuery = fetchBaseQuery({ baseUrl });

  return async (args, api, extraOptions) => {
    const token = api.getState().auth?.token; // Assuming `auth` slice contains the `token`

    // Ensure headers are present in the request
    if (!args.headers) {
      args.headers = new Headers();
    }

    // Add the Authorization header if token exists
    if (token) {
      args.headers.set('Authorization', `Bearer ${token}`);
    }

    try {
      const result = await baseQuery(args, api, extraOptions);

      console.log('###################result', result);

      if (result.meta?.response?.ok) {
        // This check is for weather the HTTP request itself was successful.
        // This means the HTTP request was successful (status code 2xx)

        if (result?.data?.success) {
          //
          // Return the custom success response
          return {
            ...result,
            data: {
              data: result?.data?.data,
              message: result.data.message,
              success: true,
            },
            // <===============OUTPUT===============>
            // {
            //     "success": true,
            //     "message": "User logged in successfully",
            //     "data": {
            //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTMyYjg4OGIxZDY2NTA2ZjdkZDgwNiIsIm5hbWUiOiJEaGFudmVlciIsImVtYWlsIjoiZDFAZ21haWwuY29tIiwiaWF0IjoxNzM4NzQ3MDIzLCJleHAiOjE3Mzg3NTA2MjN9.0NLE8Sa_je97UUKV5Dp5lsnQoN_H4b_pKT7SEB83WCk",
            //         "user": {
            //             "id": "67a32b888b1d66506f7dd806",
            //             "name": "Dhanveer",
            //             "email": "d1@gmail.com"
            //         }
            //     }
            // }
          };
        }
        // else {
        //   // If 'success' is false in the response, treat it as an error
        //   return {
        //     error: {
        //       success: false,
        //       status: result.error?.originalStatus || 500,
        //       message: result.data?.message || 'An error occurred',
        //     },
        //   };
        // }
      } else {
        return {
          data: {
            success: false,
            // errors: result?.error?.data?.fieldErrors || result?.error?.data?.message
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
