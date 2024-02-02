import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  ChangePasswordRequestPayload,
  EmailConfirmRequestPayload,
  LoginRequestPayload,
  LoginRequestResponse, RefreshTokenRequestResponse, ResendConfirmCodeRequestPayload,
  UserRegistrationRequestPayload
} from "../types/requests/post/requests";
import {Endpoints} from "../constants/endpoints";
import {lsKeys} from "../constants/constants";
import {GetOwnDataResponse} from "../types/requests/get/requests";

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
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        }
      }),
    }),

    loginUser: builder.mutation<LoginRequestResponse, LoginRequestPayload>({
      query: (body) => ({
        url: Endpoints.Login,
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<any, void>({
      query: () => ({
        url: Endpoints.Logout,
        method: 'POST'
      }),
    }),

    refreshToken: builder.mutation<RefreshTokenRequestResponse, void>({
      query: () => ({
        url: Endpoints.RefreshToken,
        method: 'POST'
      }),
    }),

    userRegistration: builder.mutation<any, UserRegistrationRequestPayload>({
      query: (body) => ({
        url: Endpoints.Registration,
        method: 'POST',
        body,
      })
    }),

    EmailConfirm: builder.mutation<any, EmailConfirmRequestPayload>({
      query: (body) => ({
        url: Endpoints.RegistrationConfirmation,
        method: 'POST',
        body,
      })
    }),

    ResendConfirmCode: builder.mutation<any, ResendConfirmCodeRequestPayload>({
      query: (body) => ({
        url: Endpoints.EmailResending,
        method: 'POST',
        body,
      })
    }),

    SendRecoveryPasswordLink: builder.mutation<any, ResendConfirmCodeRequestPayload>({
      query: (body) => ({
        url: Endpoints.PasswordRecovery,
        method: 'POST',
        body,
      })
    }),

    ChangePassword: builder.mutation<any, ChangePasswordRequestPayload>({
      query: (body) => ({
        url: Endpoints.NewPassword,
        method: 'POST',
        body,
      })
    }),

    GetOwnData: builder.query<GetOwnDataResponse, void>({
      query: () => ({
        url: Endpoints.MyData,
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        }
      })
    }),
  }),
})

export const {
  useLoginUserMutation,
  useUserRegistrationMutation,
  useEmailConfirmMutation,
  useResendConfirmCodeMutation,
  useSendRecoveryPasswordLinkMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useLazyGetOwnDataQuery
} = authApi
