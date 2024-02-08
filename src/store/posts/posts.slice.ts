import { createSlice } from '@reduxjs/toolkit'
import {PostViewType} from "../../types/general";
import {postsApi} from "../../services/posts.api";

type InitialStateType = {
    posts: PostViewType[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    post: PostViewType | null
}

const initialState: InitialStateType = {
    posts: [],
    pagesCount: 0,
    page: 1,
    pageSize: 10,
    totalCount: 0,
    post: null
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
      builder.addMatcher(
          postsApi.endpoints?.getAllPosts.matchFulfilled,
          (state,  { payload} ) => {

              state.posts = payload.items
              state.pagesCount = payload.pagesCount
              state.page = payload.page
              state.pageSize = payload.pageSize
              state.totalCount = payload.totalCount
          }
      );

      builder.addMatcher(
          postsApi.endpoints?.getPost.matchFulfilled,
          (state,  { payload} ) => {
              state.post = payload
          }
      );

      builder.addMatcher(
          postsApi.endpoints?.deletePost.matchFulfilled,
          (state,  { payload} ) => {

              //@ts-ignore
              state.posts = state.posts.filter(b => b.id !== payload.id)
              state.totalCount = --state.totalCount
          }
      );
  },
})

export const postActions = postSlice.actions
export const postReducer = postSlice.reducer