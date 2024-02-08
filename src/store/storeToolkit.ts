import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import {authApi} from "../services/auth.api";
import {authReducer} from "./auth/auth.slice";
import {devicesApi} from "../services/devices.api";
import {deviceReducer} from "./devices/device.slice";
import {blogsApi} from "../services/blogs.api";
import {blogReducer} from "./blogs/blogs.slice";
import {postsApi} from "../services/posts.api";
import {postReducer} from "./posts/posts.slice";
import {commentsApi} from "../services/comments.api";
import {commentReducer} from "./comments/comments.slice";

export const Store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    blogs: blogReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    posts: postReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    comments: commentReducer,
    [devicesApi.reducerPath]: devicesApi.reducer,
    devices: deviceReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(blogsApi.middleware)
    .concat(postsApi.middleware)
    .concat(devicesApi.middleware)
    .concat(commentsApi.middleware)
    .concat(authApi.middleware)
})

setupListeners(Store.dispatch)

type RootState = ReturnType<typeof Store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
