import { createSlice } from '@reduxjs/toolkit'
import { UserSlice } from '../../../typings'
import {
  AuthorizationStatus,
  BASE_URL,
  ChangePasswordStatus,
  NameSpace,
} from '../../../utils/consts'
import {
  getUserThunk,
  loginThunk,
  logoutThunk,
  signUpThunk,
  updateAvatarThunk,
  updatePasswordThunk,
  updateProfileThunk,
  getYandexIdThunk,
  signinYandexThunk,
} from '../../api-thunks'

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
  changePasswordStatus: {
    message: '',
    isLoading: false,
  },
  yandexOAuthId: '',
}

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    resetPasswordStatus: state => {
      state.changePasswordStatus.message = ''
    },
  },
  extraReducers: builder => {
    builder.addCase(loginThunk.fulfilled, state => {
      state.authorizationStatus = AuthorizationStatus.Auth
    }),
      builder.addCase(loginThunk.pending, state => {
        state.authorizationStatus = AuthorizationStatus.Unknown
      }),
      builder.addCase(loginThunk.rejected, state => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
      }),
      builder.addCase(signinYandexThunk.pending, state => {
        state.authorizationStatus = AuthorizationStatus.Unknown
      }),
      builder.addCase(signinYandexThunk.fulfilled, state => {
        state.authorizationStatus = AuthorizationStatus.Auth
      }),
      builder.addCase(signinYandexThunk.rejected, state => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
      }),
      builder.addCase(getYandexIdThunk.fulfilled, (state, action) => {
        state.yandexOAuthId = action.payload?.service_id
      }),
      builder.addCase(getUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload
        const avatar = action.payload.avatar
        state.currentUser.avatar = avatar
          ? `${BASE_URL}resources/${avatar}`
          : undefined
        if (!state.currentUser.display_name) {
          state.currentUser.display_name = `${state.currentUser.login}`
        }
        state.authorizationStatus = AuthorizationStatus.Auth
      }),
      builder.addCase(getUserThunk.rejected, state => {
        state.currentUser = initialState.currentUser
        state.authorizationStatus = AuthorizationStatus.NoAuth
      }),
      builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
        const avatar = state.currentUser.avatar
        state.currentUser = action.payload
        state.currentUser.avatar = avatar
      }),
      builder.addCase(updateAvatarThunk.fulfilled, (state, action) => {
        state.currentUser.avatar = action.payload.avatar
          ? `${BASE_URL}resources/${action.payload.avatar}`
          : undefined
      }),
      builder.addCase(updateAvatarThunk.rejected, (state, action) => {
        console.log(action.payload)
      }),
      builder.addCase(logoutThunk.pending, state => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
      }),
      builder.addCase(logoutThunk.fulfilled, state => {
        state.currentUser = initialState.currentUser
        state.authorizationStatus = AuthorizationStatus.NoAuth
      }),
      builder.addCase(signUpThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.authorizationStatus = AuthorizationStatus.Auth
      }),
      builder.addCase(signUpThunk.pending, state => {
        state.authorizationStatus = AuthorizationStatus.Unknown
      }),
      builder.addCase(signUpThunk.rejected, state => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
      }),
      builder.addCase(updatePasswordThunk.fulfilled, state => {
        state.changePasswordStatus.message = ChangePasswordStatus.Changed
        state.changePasswordStatus.isLoading = false
      }),
      builder.addCase(updatePasswordThunk.pending, state => {
        state.changePasswordStatus.isLoading = true
      }),
      builder.addCase(updatePasswordThunk.rejected, state => {
        state.changePasswordStatus.message = ChangePasswordStatus.NoChanged
        state.changePasswordStatus.isLoading = false
      })
  },
})

export const { resetPasswordStatus } = userSlice.actions
