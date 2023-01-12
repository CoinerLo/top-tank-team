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
  const { currentUser } = useAppselector(({ USER }) => USER)
  const { display_name } = currentUser
  const relocation = <Navigate to={`/${AppRoute.Headquarters}`} />
  let game

  if (!gameId) {
    return relocation
  }

  game = games[gameId]
  if (game) {
    return getGameDesk(game)
  }

  const localGames = localStorage.getItem(display_name)
  if (!localGames) {
    return relocation
  }

  const localGame = JSON.parse(localGames)[gameId]
  if (localGame) {
    game = new Game(localGame)
  }

  return game ? getGameDesk(game) : relocation
}
