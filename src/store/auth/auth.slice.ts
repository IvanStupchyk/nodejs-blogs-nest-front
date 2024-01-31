import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthStateType = {
  authStatement: boolean
}

const initialState = {
  isAuth: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserAC(state, action: PayloadAction<AuthStateType>) {
      state.isAuth = action.payload.authStatement
    }
  },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
