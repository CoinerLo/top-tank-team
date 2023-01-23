import { createSlice } from '@reduxjs/toolkit'
import { IForumSlice } from '../../../typings'
import { NameSpace } from '../../../utils/consts'
import {
  commentsByTopicInDBThunk,
  findAlltopicInDBThunk,
} from '../../api-thunks'

const initialState: IForumSlice = {
  topics: [],
  comments: [],
}

export const forumSlice = createSlice({
  name: NameSpace.Forum,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(findAlltopicInDBThunk.fulfilled, (state, action) => {
      state.topics = [...action.payload.databaseTopicStatus]
    }),
      builder.addCase(findAlltopicInDBThunk.rejected, (state, action) => {
        console.log(action.payload)
      })
    builder.addCase(commentsByTopicInDBThunk.fulfilled, (state, action) => {
      state.comments = [...action.payload.databaseCommentStatus]
    }),
      builder.addCase(commentsByTopicInDBThunk.rejected, (state, action) => {
        console.log(action.payload)
      })
  },
})
