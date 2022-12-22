import { configureStore } from '@reduxjs/toolkit'
import { redirect } from './middlewares/redirect'
import { rootReducer } from './root-reducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(redirect),
  preloadedState: JSON.parse(window.__PRELOADED_STATE__),
})

delete window.__PRELOADED_STATE__
