import { configureStore } from '@reduxjs/toolkit'
import { DefaultPraktikumClient } from '../api/PraktikumClient'
import { rootReducer } from './root-reducer'

export const api = DefaultPraktikumClient

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
})
