import { createSlice } from '@reduxjs/toolkit'
import {BlogType} from "../../types/general";
import {blogsApi} from "../../services/blogs.api";

type InitialStateType = {
    blogs: BlogType[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
}

const initialState: InitialStateType = {
    blogs: [],
    pagesCount: 0,
    page: 1,
    pageSize: 10,
    totalCount: 0
}

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
      builder.addMatcher(
          blogsApi.endpoints?.getBlogs.matchFulfilled,
          (state,  { payload} ) => {

              state.blogs = payload.items
              state.pagesCount = payload.pagesCount
              state.page = payload.page
              state.pageSize = payload.pageSize
              state.totalCount = payload.totalCount
          }
      );

      builder.addMatcher(
          blogsApi.endpoints?.deleteBlog.matchFulfilled,
          (state,  { payload} ) => {

              //@ts-ignore
              state.blogs = state.blogs.filter(b => b.id !== payload.id)
              state.totalCount = --state.totalCount
          }
      );
  },
})

export const blogActions = blogSlice.actions
export const blogReducer = blogSlice.reducer
