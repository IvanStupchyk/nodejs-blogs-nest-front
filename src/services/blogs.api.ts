import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Endpoints} from "../constants/endpoints";
import {lsKeys} from "../constants/constants";
import {BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {BlogsViewType, BlogType} from "../types/general";
import {BlogCreateRequestPayload, BlogUpdateRequestPayload} from "../types/requests/post/requests";

export const blogsApi = createApi({
  reducerPath: 'api/blogs',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.APP_BASE_BACK_URL_STAGING ?? 'http://localhost:3000/',
    credentials: 'include',
  }),
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogsViewType, string>({
      query: (params: string) => ({
        url: `blogger/${Endpoints.Blogs}${params}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        }
      }),
    }),

    getBlog: builder.query<BlogType, string>({
      query: (id: string) => ({
        url: `${Endpoints.Blogs}/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        }
      }),
    }),

    createBlog: builder.mutation<void, BlogCreateRequestPayload>({
      query: (body) => ({
        url: `blogger/${Endpoints.Blogs}`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        },
        body
      })
    }),

    deleteBlog: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `blogger/${Endpoints.Blogs}/${id}`,
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

    updateBlog: builder.mutation<void, BlogUpdateRequestPayload>({
      query: (body: BlogUpdateRequestPayload) => ({
        url: `blogger/${Endpoints.Blogs}/${body.id}`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        },
        body: {
          name: body.name,
          description: body.description,
          websiteUrl: body.websiteUrl
        }
      }),
    }),
  }),
})

export const {
    useLazyGetBlogsQuery,
    useLazyGetBlogQuery,
    useUpdateBlogMutation,
    useCreateBlogMutation,
    useDeleteBlogMutation
} = blogsApi
