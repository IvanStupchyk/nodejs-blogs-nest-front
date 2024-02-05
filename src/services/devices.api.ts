import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Endpoints} from "../constants/endpoints";
import {lsKeys} from "../constants/constants";
import {GetDevicesResponse} from "../types/requests/get/requests";
import {BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

export const devicesApi = createApi({
  reducerPath: 'api/security',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.APP_BASE_BACK_URL_STAGING ?? 'http://localhost:3000/security/',
    credentials: 'include',
  }),
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getDevices: builder.query<GetDevicesResponse[], void>({
      query: () => ({
        url: Endpoints.Devices,
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        }
      }),
    }),

    deleteAllDevices: builder.mutation<void, string>({
      query: (id: string) => ({
        url: Endpoints.Devices,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        }
      }),

      transformResponse(baseQueryReturnValue: BaseQueryResult<any>, meta: BaseQueryMeta<any>, arg: any): Promise<{id: string}> | any {
        return {
          id: arg
        }
      }
    }),

    deleteSpecifiedDevice: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `${Endpoints.Devices}/${id}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        }
      }),

      transformResponse(baseQueryReturnValue: BaseQueryResult<any>, meta: BaseQueryMeta<any>, arg: string): Promise<{id: string}> | any {
        return {
          id: arg
        }
      }
    }),
  }),
})

export const {
  useDeleteAllDevicesMutation,
  useDeleteSpecifiedDeviceMutation,
  useLazyGetDevicesQuery
} = devicesApi
