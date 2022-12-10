import { configureStore } from '@reduxjs/toolkit'
import { redirect } from './middlewares/redirect'
import { rootReducer } from './root-reducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(redirect),
})

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function createStore(initialState: any) {
//   const store = configureStore({
//     reducer: rootReducer,
//     preloadedState: initialState,
//     middleware: getDefaultMiddleware =>
//       getDefaultMiddleware({
//         serializableCheck: false,
//       }).concat(redirect),
//   })

//   if (process.env.NODE_ENV === 'development' && module.hot) {
//     module.hot.accept('./rootReducer', () => {
//       const newRootReducer = require('./root-reduser').default;
//       store.replaceReducer(newRootReducer);
//     });
//   }

//   return store;
// }
