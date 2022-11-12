import { createAsyncThunk } from '@reduxjs/toolkit'
import { store } from '.'
import AuthController from '../controllers/AuthController'
import { ISignInData } from '../typings'
import { AppRoute, AuthorizationStatus } from '../utils/consts'
import { redirectToRoute } from './action'
import { requireAuthorization } from './user-process/user-process'

export const loginAction = createAsyncThunk(
  'user/login',
  async (data: ISignInData) => {
    try {
      await AuthController.signin(data)
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth))
      store.dispatch(redirectToRoute(AppRoute.Headquarters))
    } catch (error) {
      console.error(error)
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth))
    }
  }
)

export const getUserAction = createAsyncThunk('user/getUser', async () => {
  try {
    await AuthController.fetchUser()
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth))
  } catch (error) {
    console.error(error)
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth))
  }
})

export const logoutAction = createAsyncThunk('user/logout', async () => {
  try {
    await AuthController.logout()
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth))
  } catch (error) {
    console.error(error)
  }
})
