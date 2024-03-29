import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'
// import { usersReducer } from './users/users.slice'
// import { userReducer } from './user/user.slice'
// import { usersApi } from '../services/users.api'
// import { userApi } from '../services/user.api'
import {authApi} from "../services/auth.api";
import {authReducer} from "./auth/auth.slice";

export const Store = configureStore({
  reducer: {
    // [usersApi.reducerPath]: usersApi.reducer,
    // users: usersReducer,
    // [userApi.reducerPath]: userApi.reducer,
    // user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    // .concat(usersApi.middleware)
    // .concat(userApi.middleware)
    .concat(authApi.middleware)
})

setupListeners(Store.dispatch)

type RootState = ReturnType<typeof Store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
