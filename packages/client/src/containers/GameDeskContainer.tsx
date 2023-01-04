import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppselector } from '../hooks'
import { GameDesk } from '../pages/GameDesk'
import { getAllLeaderThunk } from '../store/api-thunks'
import { AppRoute, dataGetAllLeaderThunk } from '../utils/consts'

export const GameDeskContainer = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllLeaderThunk(dataGetAllLeaderThunk))
  }, [])
  const { gameId } = useParams()
  const { game: games } = useAppselector(({ GAME }) => GAME)
  let game
  if (gameId) {
    game = games[gameId]
  }

  return game ? (
    <GameDesk game={game} />
  ) : (
    <Navigate to={`/${AppRoute.Headquarters}`} />
  )
}
