import { createSlice } from '@reduxjs/toolkit'
import { UserSlice } from '../../../typings'
import { AuthorizationStatus, NameSpace } from '../../../utils/consts'
import { getUserThunk, loginThunk, logoutThunk } from '../../api-thunks'

const initialState: UserSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
}

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginThunk.fulfilled, state => {
      state.authorizationStatus = AuthorizationStatus.Auth
    }),
      builder.addCase(loginThunk.rejected, state => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
      }),
      builder.addCase(getUserThunk.fulfilled, state => {
        state.authorizationStatus = AuthorizationStatus.Auth
      }),
      builder.addCase(getUserThunk.rejected, state => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
      }),
      builder.addCase(logoutThunk.fulfilled, state => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
      })
  },
})
