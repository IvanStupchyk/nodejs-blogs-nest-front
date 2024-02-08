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
          commentsApi.endpoints?.deleteComment.matchFulfilled,
          (state,  { payload} ) => {

              //@ts-ignore
              state.comments = state.posts.filter(b => b.id !== payload.id)
              state.totalCount = --state.totalCount
          }
      );
  },
})

export const commentActions = commentSlice.actions
export const commentReducer = commentSlice.reducer
