import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BaseQueryError, BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  EmailConfirmRequestPayload,
  LoginRequestPayload,
  LoginRequestResponse, ResendConfirmCodeRequestPayload,
  UserRegistrationRequestPayload
} from "../types/requests/requests";

export const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([$?*|{}\]\\^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.APP_BASE_BACK_URL_STAGING ?? 'http://localhost:3000/auth/',
    credentials: 'include',
  }),
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getBlogs: builder.query<any, string>({
      query: (params: string) => ({
        url: 'blogs',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }),
    }),

    loginUser: builder.mutation<LoginRequestResponse, LoginRequestPayload>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),

    userRegistration: builder.mutation<any, UserRegistrationRequestPayload>({
      query: (body) => ({
        url: 'registration',
        method: 'POST',
        body,
      })
    }),
    EmailConfirm: builder.mutation<any, EmailConfirmRequestPayload>({
      query: (body) => ({
        url: 'registration-confirmation',
        method: 'POST',
        body,
      })
    }),

    ResendConfirmCode: builder.mutation<any, ResendConfirmCodeRequestPayload>({
      query: (body) => ({
        url: 'registration-email-resending',
        method: 'POST',
        body,
      })
    }),
  }),
})

export const {
  useLazyGetBlogsQuery,
  useLoginUserMutation,
  useUserRegistrationMutation,
  useEmailConfirmMutation,
  useResendConfirmCodeMutation
} = authApi
