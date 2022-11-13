import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthController from '../controllers/AuthController'
import { ISignInData } from '../typings'

export const loginAction = createAsyncThunk(
  'user/login',
  async (data: ISignInData) => {
    await AuthController.signin(data)
  }
)

export const getUserAction = createAsyncThunk('user/getUser', async () => {
  const res = await AuthController.fetchUser()

  console.log(res)

  return res
})

export const logoutAction = createAsyncThunk('user/logout', async () => {
  await AuthController.logout()
})
