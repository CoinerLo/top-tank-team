import { useEffect } from 'react'
import { useAppDispatch } from '../hooks'
import { Forum } from '../pages/Forum'
import { findAlltopicInDBThunk } from '../store/api-thunks'

export const ForumContainer = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(findAlltopicInDBThunk())
  }, [])

  return <Forum />
}
