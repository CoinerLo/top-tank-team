import { createSlice } from '@reduxjs/toolkit'
import { UserSlice } from '../../../typings'
import { AuthorizationStatus, NameSpace } from '../../../utils/consts'
import { getUserThunk, loginThunk, logoutThunk } from '../../api-thunks'

const initialState: UserSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  currentUser: {
    id: 0,
    first_name: 'Guest',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: null,
  },
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
      builder.addCase(getUserThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentUser = action.payload
          state.authorizationStatus = AuthorizationStatus.Auth
        } else {
          state.currentUser = initialState.currentUser
        }
      }),
      builder.addCase(getUserThunk.rejected, state => {
        state.currentUser = initialState.currentUser
        state.authorizationStatus = AuthorizationStatus.NoAuth
      }),
      builder.addCase(logoutThunk.fulfilled, state => {
        state.currentUser = initialState.currentUser
        state.authorizationStatus = AuthorizationStatus.NoAuth
      })
  },
})
