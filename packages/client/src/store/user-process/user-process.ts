import { createSlice } from '@reduxjs/toolkit'
import { UserProcess } from '../../typings'
import { AuthorizationStatus, NameSpace } from '../../utils/consts'
import { getUserAction, loginAction, logoutAction } from '../api-actions'

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
}

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginAction.fulfilled, state => {
      state.authorizationStatus = AuthorizationStatus.Auth
    }),
      builder.addCase(loginAction.rejected, state => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
      }),
      builder.addCase(getUserAction.fulfilled, state => {
        state.authorizationStatus = AuthorizationStatus.Auth
      }),
      builder.addCase(getUserAction.rejected, state => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
      }),
      builder.addCase(logoutAction.fulfilled, state => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
      })
  },
})
