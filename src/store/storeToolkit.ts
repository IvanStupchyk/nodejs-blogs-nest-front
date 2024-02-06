import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import {authApi} from "../services/auth.api";
import {authReducer} from "./auth/auth.slice";
import {devicesApi} from "../services/devices.api";
import {deviceReducer} from "./devices/device.slice";
import {blogsApi} from "../services/blogs.api";
import {blogReducer} from "./blogs/blogs.slice";

export const Store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    blogs: blogReducer,
    [devicesApi.reducerPath]: devicesApi.reducer,
    devices: deviceReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(blogsApi.middleware)
    .concat(devicesApi.middleware)
    .concat(authApi.middleware)
})

setupListeners(Store.dispatch)

type RootState = ReturnType<typeof Store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
