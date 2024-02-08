import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {lsKeys} from "../constants/constants";
import {CommentsViewType, CommentViewType} from "../types/general";
import {
  CreateCommentRequestPayload,
  PostLikeRequestPayload, UpdateCommentRequestPayload,
} from "../types/requests/post/requests";
import {BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {Endpoints} from "../constants/endpoints";

export const commentsApi = createApi({
  reducerPath: 'api/comments',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.APP_BASE_BACK_URL_STAGING ?? 'http://localhost:3000/',
    credentials: 'include',
  }),
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getPostComments: builder.query<CommentsViewType, string>({
      query: (id: string) => ({
        url: `${Endpoints.Posts}/${id}/comments`,
      }),
    }),

    createComment: builder.mutation<CommentViewType, CreateCommentRequestPayload>({
      query: (payload: CreateCommentRequestPayload) => ({
        url: `${Endpoints.Posts}/${payload.postId}/comments`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        },
        body: {
          content: payload.content
        }
      })
    }),

    likeComment: builder.mutation<void, PostLikeRequestPayload>({
      query: (payload: PostLikeRequestPayload) => ({
        url: `comments/${payload.id}/like-status`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        },
        body: {
          likeStatus: payload.likeStatus
        }
      })
    }),

    updateComment: builder.mutation<void, UpdateCommentRequestPayload>({
      query: (payload: UpdateCommentRequestPayload) => ({
        url: `comments/${payload.commentId}`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem(lsKeys.AccessToken)}`
        },
        body: {
          content: payload.content
        }
      })
    }),

    deleteComment: builder.mutation<void, string>({
      query: (commentId: string) => ({
        url: `comments/${commentId}`,
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
  }),
})

export const {
  useLazyGetPostCommentsQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useLikeCommentMutation,
    useDeleteCommentMutation
} = commentsApi
