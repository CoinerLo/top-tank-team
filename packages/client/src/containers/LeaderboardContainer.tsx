import { useEffect } from 'react'
import { useAppDispatch } from '../hooks'
import { Leaderboard } from '../pages/Leaderboard'
import { getAllLeaderThunk } from '../store/api-thunks'

export const LeaderboardContainer = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const data = {
      ratingFieldName: 'ratingTopTank1',
      cursor: 0,
      limit: 10,
    }
    dispatch(getAllLeaderThunk(data))
  }, [])

  return <Leaderboard />
}
