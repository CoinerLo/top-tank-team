import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppselector } from '../hooks'
import { GameResult } from '../pages/GameDesk/GameResult'
import { addLeaderThunk } from '../store/api-thunks'
import { resultGameDataCreator } from '../utils'
import { AppRoute } from '../utils/consts'

export const GameResultContainer = () => {
  const dispatch = useAppDispatch()
  const { gameId } = useParams()
  const { currentUser } = useAppselector(({ USER }) => USER)
  const { game: games } = useAppselector(({ GAME }) => GAME)
  let game,
    headquartersHealth: any,
    vehiclesDestroyed: any,
    platoonsDestroyed: any
  if (gameId) {
    game = games[gameId]
  }
  if (game) {
    ;({ headquartersHealth, vehiclesDestroyed, platoonsDestroyed } =
      resultGameDataCreator(game))
  }

  useEffect(() => {
    const name = currentUser.login
    let ratingTopTank1 =
      ((headquartersHealth.user +
        vehiclesDestroyed.user +
        platoonsDestroyed.user) /
        100) *
      5
    if (ratingTopTank1 > 5) {
      ratingTopTank1 = 5
    }

    const data = {
      data: {
        name,
        ratingTopTank1,
      },
      ratingFieldName: 'ratingTopTank1',
      teamName: 'topTank1',
    }
    dispatch(addLeaderThunk(data))
  }, [])

  return game ? (
    <GameResult game={game} />
  ) : (
    <Navigate to={`/${AppRoute.Headquarters}`} />
  )
}
