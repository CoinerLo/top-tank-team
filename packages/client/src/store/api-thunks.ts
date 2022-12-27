import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthController from '../controllers/AuthController'
import {
  ISignInData,
  IChangeDataForm,
  ISingUpForm,
  OAuthSingIn,
  ILeaderAll,
  ILeaderAdd,
} from '../typings'
import UserController from '../controllers/UserController'
import { UserAPIUpdatePassword } from '../api/UserAPI'
import OAuthController from '../controllers/OAuthController'
import LeaderController from '../controllers/LeaderController'

export const loginThunk = createAsyncThunk(
  'user/login',
  async (data: ISignInData, thunkAPI) => {
    await AuthController.signin(data)
    thunkAPI.dispatch(getUserThunk())
    thunkAPI.dispatch(getUserThunk())
  }
)

export const signUpThunk = createAsyncThunk(
  'user/signUp',
  async (data: ISingUpForm) => {
    const res = await AuthController.signup(data)
    return res?.data
  }
)

export const getYandexIdThunk = createAsyncThunk(
  'user/getYandexId',
  async (data: string) => {
    const res = await OAuthController.getYandexId(data)
    return res?.data
  }
)

export const signinYandexThunk = createAsyncThunk(
  'user/signinYandex',
  async (data: OAuthSingIn, thunkAPI) => {
    await OAuthController.signinYandex(data)
    thunkAPI.dispatch(getUserThunk())
  }
)

export const getUserThunk = createAsyncThunk('user/getUser', async () => {
  const res = await AuthController.fetchUser()
  return res?.data
})

export const logoutThunk = createAsyncThunk('user/logout', async () => {
  await AuthController.logout()
})

export const updateProfileThunk = createAsyncThunk(
  'user/updateProfile',
  async (data: IChangeDataForm) => {
    const res = await UserController.updateProfile(data)
    return res?.data
  }
)

export const updatePasswordThunk = createAsyncThunk(
  'user/updatePassword',
  async (data: UserAPIUpdatePassword) => {
    const res = await UserController.updatePassword(data)
    return res?.data
  }
)

export const updateAvatarThunk = createAsyncThunk(
  'user/updateAvatar',
  async (data: FormData) => {
    const res = await UserController.updateAvatar(data)
    return res?.data
  }
)

export const getAllLeaderThunk = createAsyncThunk(
  'user/getAllLeader',
  async (data: ILeaderAll) => {
    const res = await LeaderController.getAllLeader(data)
    return res?.data
  }
)

export const addLeaderThunk = createAsyncThunk(
  'user/addLeader',
  async (data: ILeaderAdd) => {
    const res = await LeaderController.addLeader(data)
    return res?.data
  }
)
