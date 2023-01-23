import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppselector } from '../hooks'
import { Forum } from '../pages/Forum'
import { addPostInDBThunk, findAlltopicInDBThunk } from '../store/api-thunks'

export interface IPostData {
  topic: string
  comment: string
  authorName?: string
}

export const ForumContainer = () => {
  const dispatch = useAppDispatch()
  const forum = useAppselector(({ FORUM }) => FORUM)
  const { login } = useAppselector(({ USER }) => USER.currentUser)

  useEffect(() => {
    dispatch(findAlltopicInDBThunk())
  }, [])

  const submitCommentData = useCallback(
    async ({ topic, comment, authorName }: Required<IPostData>) => {
      await dispatch(addPostInDBThunk({ topic, comment, authorName }))
      dispatch(findAlltopicInDBThunk())
    },
    []
  )

  return (
    <Forum
      authorName={login}
      forum={forum}
      submitCommentData={submitCommentData}
    />
  )
}
