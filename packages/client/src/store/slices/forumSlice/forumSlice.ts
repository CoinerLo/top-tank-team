import { createSlice } from '@reduxjs/toolkit'
import { IForumSlice } from '../../../typings'
import { NameSpace } from '../../../utils/consts'
import { commentsByTopicInDBThunk, topicAllInDBThunk } from '../../api-thunks'

const initialState: IForumSlice = {
  topic: [],
  comment: [],
}

export const forumSlice = createSlice({
  name: NameSpace.Forum,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(topicAllInDBThunk.fulfilled, (state, action) => {
      state.topic = [...action.payload.databaseTopicStatus]
    }),
      builder.addCase(topicAllInDBThunk.rejected, (state, action) => {
        console.log(action.payload)
      })
    builder.addCase(commentsByTopicInDBThunk.fulfilled, (state, action) => {
      state.comment = [...action.payload.databaseCommentStatus]
    }),
      builder.addCase(commentsByTopicInDBThunk.rejected, (state, action) => {
        console.log(action.payload)
      })
  },
})