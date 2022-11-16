import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthController from '../controllers/AuthController'
import { ISignInData, IChangeDataForm } from '../typings'
import UserController from '../controllers/UserController'

export const loginThunk = createAsyncThunk(
  'user/login',
  async (data: ISignInData) => {
    await AuthController.signin(data)
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

export const updateAvatarThunk = createAsyncThunk(
  'user/updateAvatar',
  async (data: FormData) => {
    const res = await UserController.updateAvatar(data)
    return res?.data
  }
)
