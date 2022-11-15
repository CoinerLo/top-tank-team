import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthController from '../controllers/AuthController'
import { ISignInData } from '../typings'

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
