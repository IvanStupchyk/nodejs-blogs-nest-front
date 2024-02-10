import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {likeStatus, lsKeys} from "../constants/constants";
import {PostsType, PostViewType} from "../types/general";
import {
  CreatePostRequestPayload,
  DeletePostRequestPayload,
  PostLikeRequestPayload,
  UpdatePostRequestPayload
} from "../types/requests/post/requests";
import {BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {Endpoints} from "../constants/endpoints";

export const postsApi = createApi({
  reducerPath: 'api/posts',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.APP_BASE_BACK_URL_STAGING ?? 'http://localhost:3000/',
    credentials: 'include',
  }),
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostsType, string>({
      query: (params: string) => ({
        url: `${Endpoints.Posts}${params}`,
      }),
    }),

    getPost: builder.query<PostViewType, string>({
      query: (id: string) => ({
        url: `${Endpoints.Posts}/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        },
      }),
    }),

    likePost: builder.mutation<void, PostLikeRequestPayload>({
      query: (payload: PostLikeRequestPayload) => ({
        url: `posts/${payload.id}/like-status`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        },
        body: {
          likeStatus: payload.likeStatus
        }
      }),

      transformResponse(baseQueryReturnValue: BaseQueryResult<any>, meta: BaseQueryMeta<any>, arg: any): Promise<{postId: string, likeStatus: likeStatus}> | any {
        return {
          postId: arg.id,
          likeStatus: arg.likeStatus
        }
      }
    }),

    createPost: builder.mutation<PostViewType, CreatePostRequestPayload>({
      query: (payload: CreatePostRequestPayload) => ({
        url: `blogger/blogs/${payload.blogId}/posts`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        },
        body: {
          title: payload.title,
          shortDescription: payload.shortDescription,
          content: payload.content,
        }
      })
    }),

    deletePost: builder.mutation<void, DeletePostRequestPayload>({
      query: (payload: DeletePostRequestPayload) => ({
        url: `blogger/blogs/${payload.blogId}/posts/${payload.postId}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        }
      }),

      transformResponse(baseQueryReturnValue: BaseQueryResult<any>, meta: BaseQueryMeta<any>, arg: any): Promise<{id: string}> | any {
        return {
          id: arg.postId
        }
      }
    }),
  }),
})

export const {
    useLazyGetAllPostsQuery,
    useLazyGetPostQuery,
    useLikePostMutation,
    useCreatePostMutation,
    useDeletePostMutation,
} = postsApi
