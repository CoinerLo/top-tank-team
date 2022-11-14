import { createAction } from '@reduxjs/toolkit'
import { AppRoute } from '../utils/consts'

export const redirectToRoute = createAction<AppRoute | string>(
  'redirectToRoute'
)
