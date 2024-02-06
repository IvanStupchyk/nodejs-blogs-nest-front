import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Endpoints} from "../constants/endpoints";
import {lsKeys} from "../constants/constants";
import {BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {BlogsViewType} from "../types/general";
import {BlogCreateRequestPayload} from "../types/requests/post/requests";

export const blogsApi = createApi({
  reducerPath: 'api/blogs',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.APP_BASE_BACK_URL_STAGING ?? 'http://localhost:3000/blogger/',
    credentials: 'include',
  }),
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogsViewType, string>({
      query: (params: string) => ({
        url: `${Endpoints.Blogs}${params}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        }
      }),
    }),

    createBlog: builder.mutation<void, BlogCreateRequestPayload>({
      query: (body) => ({
        url: Endpoints.Blogs,
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        },
        body
      })
    }),

    deleteBlog: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `${Endpoints.Blogs}/${id}`,
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

    changeBlog: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `${Endpoints.Blogs}/${id}`,
        method: 'PUT',
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
  }),
})

export const {
    useLazyGetBlogsQuery,
    useChangeBlogMutation,
    useCreateBlogMutation,
    useDeleteBlogMutation
} = blogsApi
