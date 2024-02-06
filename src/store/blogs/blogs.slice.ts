import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {BlogType} from "../../types/general";
import {blogsApi} from "../../services/blogs.api";

type InitialStateType = {
  blogs: BlogType[]
}

const initialState: InitialStateType = {
  blogs: []
}

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogsAC(state, action: PayloadAction<BlogType[]>) {
      state.blogs = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addMatcher(
        blogsApi.endpoints?.createBlog.matchFulfilled,
        (state,  { payload} ) => {
          console.log('payload', payload)
          console.log('state.blogs', state.blogs)

          //@ts-ignore
          // state.blogs = state.blogs.push(payload)
          state.blogs = payload
        }
    );

    // builder.addMatcher(
    //     devicesApi.endpoints?.deleteAllDevices.matchFulfilled,
    //     (state,  {payload} ) => {
    //       //@ts-ignore
    //       state.devices = state.devices.filter(d => d.deviceId === payload.id)
    //     }
    // )
  },
})

export const blogActions = blogSlice.actions
export const blogReducer = blogSlice.reducer
