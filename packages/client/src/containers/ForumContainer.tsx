import { useEffect } from 'react'
import { useAppDispatch } from '../hooks'
import { Forum } from '../pages/Forum'
import { topicAllInDBThunk } from '../store/api-thunks'

export const ForumContainer = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(topicAllInDBThunk())
  }, [])

  return <Forum />
}
