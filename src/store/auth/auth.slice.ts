import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {GetOwnDataResponse} from "../../types/requests/get/requests";

type LoginUserACType = {
  authStatement: boolean,
}

type InitialStateType = {
  isAuth: boolean,
  userId: string
  login: string
  email: string
}

const initialState: InitialStateType = {
  isAuth: false,
  userId: '',
  login: '',
  email: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserAC(state, action: PayloadAction<LoginUserACType>) {
      state.isAuth = action.payload.authStatement
    },

    setOwnUserDataAC(state, action: PayloadAction<GetOwnDataResponse>) {
      state.userId = action.payload.userId
      state.login = action.payload.login
      state.email = action.payload.email
    },

    logoutUserAC(state, action: PayloadAction<void>) {
      state.isAuth = initialState.isAuth
      state.userId = initialState.userId
      state.login = initialState.login
      state.email = initialState.email
    }
  },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
