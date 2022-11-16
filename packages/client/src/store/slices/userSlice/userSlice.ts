import { createSlice } from '@reduxjs/toolkit'
import { UserSlice } from '../../../typings'
import { AuthorizationStatus, BASE_URL, NameSpace } from '../../../utils/consts'
import { getUserThunk, loginThunk, logoutThunk } from '../../api-thunks'

const initialState: UserSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  currentUser: {
    id: 0,
    first_name: '',
    second_name: '',
    display_name: 'Guest',
    login: '',
    email: '',
    phone: '',
    avatar: undefined,
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
          const avatar = action.payload.avatar
          state.currentUser.avatar = avatar
            ? `${BASE_URL}resources/${avatar}`
            : undefined
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
