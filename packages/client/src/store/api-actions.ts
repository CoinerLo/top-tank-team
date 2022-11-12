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
