import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthController from '../controllers/AuthController'
import {
  ISignInData,
  IChangeDataForm,
  ISingUpForm,
  OAuthSingIn,
  UserDBType,
} from '../typings'
import UserController from '../controllers/UserController'
import { UserAPIUpdatePassword } from '../api/UserAPI'
import OAuthController from '../controllers/OAuthController'
import DatabaseController from '../controllers/DatabaseController'

export const loginThunk = createAsyncThunk(
  'user/login',
  async (data: ISignInData, thunkAPI) => {
    await AuthController.signin(data)
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
  const resDB = await DatabaseController.findAndAddUserInDB({
    firstName: res.data.first_name,
    lastName: res.data.second_name,
  })
  return { ...res.data, ...resDB.data }
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

export const addUserInDBThunk = createAsyncThunk(
  'database/addUser',
  async (data: UserDBType) => {
    const res = await DatabaseController.addUserInDB(data)
    return res.data
  }
)

export const findUserInDBThunk = createAsyncThunk(
  'database/findUser',
  async (data: UserDBType) => {
    const res = await DatabaseController.findUserInDB(data)
    return res.data
  }
)
