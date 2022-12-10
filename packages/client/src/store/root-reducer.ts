import { combineReducers } from '@reduxjs/toolkit'
import { NameSpace } from '../utils/consts'
import { userSlice } from './slices/userSlice/userSlice'
import { decksSlice } from './slices/decksSlice/decksSlice'
import { gameSlice } from './slices/gameSlice/gameSlice'
import { connectRouter } from 'connected-react-router';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Decks]: decksSlice.reducer,
  [NameSpace.Game]: gameSlice.reducer,
  router: connectRouter(history),
})
