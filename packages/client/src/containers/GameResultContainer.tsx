import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAppselector } from '../hooks'
import { GameResult } from '../pages/GameDesk/GameResult'
import { AppRoute } from '../utils/consts'

export const GameResultContainer = () => {
  const { gameId } = useParams()
  const { game: games } = useAppselector(({ GAME }) => GAME)
  let game
  if (gameId) {
    game = games[gameId]
  }

  return game ? (
    <GameResult game={game} />
  ) : (
    <Navigate to={`/${AppRoute.Headquarters}`} />
  )
}
