import { configureStore } from '@reduxjs/toolkit'
import { redirect } from './middlewares/redirect'
import { rootReducer } from './root-reducer'
import { createBrowserHistory, createMemoryHistory } from 'history';

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(redirect),
// })

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createStore(initialState: any, url = '/') {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(redirect),
  })

  const history = isServer
      ? createMemoryHistory({ initialEntries: [url] })
      : createBrowserHistory();

  return { store, history };
}
