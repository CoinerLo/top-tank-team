import { useEffect } from 'react'
import { useAppDispatch } from '../hooks'
import { Leaderboard } from '../pages/Leaderboard'
import { getAllLeaderThunk } from '../store/api-thunks'
import { dataGetAllLeaderThunk } from '../utils/consts'

export const LeaderboardContainer = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllLeaderThunk(dataGetAllLeaderThunk))
  }, [])

  return <Leaderboard />
}
