import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppselector } from '../hooks'
import { GameDesk } from '../pages/GameDesk'
import { getAllLeaderThunk } from '../store/api-thunks'
import { AppRoute, dataGetAllLeaderThunk } from '../utils/consts'
import { Game } from '../gameCore/models/Game'

const getGameDesk = (game: Game) => <GameDesk game={game} />

export const GameDeskContainer = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllLeaderThunk(dataGetAllLeaderThunk))
  }, [])
  const { gameId } = useParams()
  const { game: games } = useAppselector(({ GAME }) => GAME)
  const relocation = <Navigate to={`/${AppRoute.Headquarters}`} />

  if (!gameId) {
    return relocation
  }

  const game = games[gameId]
  if (game) {
    return getGameDesk(game)
  }

  return game ? getGameDesk(game) : relocation
}
