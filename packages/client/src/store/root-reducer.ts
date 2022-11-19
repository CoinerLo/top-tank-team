import { combineReducers } from '@reduxjs/toolkit'
import { NameSpace } from '../utils/consts'
import { userSlice } from './slices/userSlice/userSlice'
import { decksSlice } from './slices/userSlice/decksSlice'

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Decks]: decksSlice.reducer,
})
