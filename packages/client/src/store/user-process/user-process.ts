import { createSlice } from '@reduxjs/toolkit'
import { UserProcess } from '../../typings'
import { AuthorizationStatus, NameSpace } from '../../utils/consts'

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
}

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload
    },
  },
})

export const { requireAuthorization } = userProcess.actions
