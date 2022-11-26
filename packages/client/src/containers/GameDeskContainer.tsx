import { Navigate, useParams } from 'react-router-dom'
import { useAppselector } from '../hooks'
import { GameDesk } from '../pages/GameDesk'
import { AppRoute } from '../utils/consts'

export const GameDeskContainer = () => {
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
