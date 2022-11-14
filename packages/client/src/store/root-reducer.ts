import { combineReducers } from '@reduxjs/toolkit'
import { NameSpace } from '../utils/consts'
import { userSlice } from './slices/user-slices/user-slice'

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
})
