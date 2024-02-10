import { createSlice } from '@reduxjs/toolkit'
import {CommentViewType} from "../../types/general";
import {commentsApi} from "../../services/comments.api";

type InitialStateType = {
    comments: CommentViewType[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
}

const initialState: InitialStateType = {
    comments: [],
    pagesCount: 0,
    page: 1,
    pageSize: 10,
    totalCount: 0,
}

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
      builder.addMatcher(
          commentsApi.endpoints?.getPostComments.matchFulfilled,
          (state,  { payload} ) => {

              state.comments = payload.items
              state.pagesCount = payload.pagesCount
              state.page = payload.page
              state.pageSize = payload.pageSize
              state.totalCount = payload.totalCount
          }
      );

      builder.addMatcher(
          commentsApi.endpoints?.likeComment.matchFulfilled, (state,  { payload} ) => {
              //@ts-ignore
              const initialComment = state.comments.find(c => c.id === payload.commentId)

              if (initialComment) {
                  const myStatus = initialComment.likesInfo.myStatus

                  if (myStatus === 'None') {
                      //@ts-ignore
                      if (payload.likeStatus === 'Like') {
                          initialComment.likesInfo.likesCount = ++initialComment.likesInfo.likesCount
                      }
                      //@ts-ignore
                      if (payload.likeStatus === 'Dislike') {
                          initialComment.likesInfo.dislikesCount = ++initialComment.likesInfo.dislikesCount
                      }
                  }

                  if (myStatus === 'Dislike') {
                      //@ts-ignore
                      if (payload.likeStatus === 'None') {
                          initialComment.likesInfo.dislikesCount = --initialComment.likesInfo.dislikesCount
                      }
                      //@ts-ignore
                      if (payload.likeStatus === 'Like') {
                          initialComment.likesInfo.dislikesCount = --initialComment.likesInfo.dislikesCount
                          initialComment.likesInfo.likesCount = ++initialComment.likesInfo.likesCount
                      }
                  }

                  if (myStatus === 'Like') {
                      //@ts-ignore
                      if (payload.likeStatus === 'None') {
                          initialComment.likesInfo.likesCount = --initialComment.likesInfo.likesCount
                      }
                      //@ts-ignore
                      if (payload.likeStatus === 'Dislike') {
                          initialComment.likesInfo.dislikesCount = ++initialComment.likesInfo.dislikesCount
                          initialComment.likesInfo.likesCount = --initialComment.likesInfo.likesCount
                      }
                  }

                  //@ts-ignore
                  initialComment.likesInfo.myStatus = payload.likeStatus
              }
          }
      );

      builder.addMatcher(
          commentsApi.endpoints?.deleteComment.matchFulfilled,
          (state,  { payload} ) => {
                console.log('payload', payload)
              //@ts-ignore
              state.comments = state.comments.filter(b => b.id !== payload.id)
              state.totalCount = --state.totalCount
          }
      );

      builder.addMatcher(
          commentsApi.endpoints?.createComment.matchFulfilled,
          (state,  { payload} ) => {

              state.comments.unshift(payload)
              state.totalCount = ++state.totalCount
          }
      );
  },
})

export const commentActions = commentSlice.actions
export const commentReducer = commentSlice.reducer
