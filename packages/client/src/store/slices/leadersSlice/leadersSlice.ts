import { createSlice } from '@reduxjs/toolkit'
import { ILeadersSlice } from '../../../typings'
import { NameSpace } from '../../../utils/consts'
import { getAllLeaderThunk } from '../../api-thunks'

const initialState: ILeadersSlice = {
  leaders: [],
}

export const leadersSlice = createSlice({
  name: NameSpace.Leaders,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllLeaderThunk.fulfilled, (state, action) => {
      state.leaders = action.payload
    }),
      builder.addCase(getAllLeaderThunk.rejected, (state, action) => {
        console.log(action.payload)
      })
  },
})
