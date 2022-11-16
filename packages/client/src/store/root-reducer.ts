import { combineReducers } from '@reduxjs/toolkit'
import { NameSpace } from '../utils/consts'
import { userSlice } from './slices/userSlice/userSlice'

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
})
