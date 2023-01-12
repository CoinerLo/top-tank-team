import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppselector } from '../hooks'
import { GameResult } from '../pages/GameDesk/GameResult'
import { addLeaderThunk } from '../store/api-thunks'
import { KeyDataGameResultType } from '../typings'
import { calculationRatingTopTank1, resultGameDataCreator } from '../utils'
import { AppRoute, ratingFieldName, teamName } from '../utils/consts'

export const GameResultContainer = () => {
  const dispatch = useAppDispatch()
  const { gameId } = useParams()
  const { USER, GAME } = useAppselector(({ USER, GAME }) => ({ USER, GAME }))
  const { currentUser } = USER
  const { game: games } = GAME
  let game,
    headquartersHealth: KeyDataGameResultType<number>,
    vehiclesDestroyed: KeyDataGameResultType<number>,
    platoonsDestroyed: KeyDataGameResultType<number>
  if (gameId) {
    game = games[gameId]
  }
  if (game) {
    ;({ headquartersHealth, vehiclesDestroyed, platoonsDestroyed } =
      resultGameDataCreator(game))
  }

  useEffect(() => {
    const name = currentUser.login
    const ratingTopTank1 = calculationRatingTopTank1(
      headquartersHealth.user,
      vehiclesDestroyed.user,
      platoonsDestroyed.user
    )

    const data = {
      data: {
        name,
        ratingTopTank1,
      },
      ratingFieldName,
      teamName,
    }
    dispatch(addLeaderThunk(data))
  }, [])

  return game ? (
    <GameResult game={game} />
  ) : (
    <Navigate to={`/${AppRoute.Headquarters}`} />
  )
}
