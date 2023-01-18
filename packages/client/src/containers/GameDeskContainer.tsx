import { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppselector } from '../hooks'
import { GameDesk } from '../pages/GameDesk'
import {
  findAllGamesInDBThunk,
  getAllLeaderThunk,
  getUserThunk,
} from '../store/api-thunks'
import { AppRoute, dataGetAllLeaderThunk } from '../utils/consts'
import {
  AxiosResponseGameApiType,
  AxiosResponseUserApiType,
  GameDBType,
} from '../typings'
import { Game } from '../gameCore/models/Game'
import { PayloadAction } from '@reduxjs/toolkit'

export const GameDeskContainer = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { gameId } = useParams()
  const { game: games } = useAppselector(({ GAME }) => GAME)
  const [game, setGame] = useState<Game | undefined>(games[gameId ?? 1])
  const { databaseId } = useAppselector(({ USER }) => USER)

  useEffect(() => {
    dispatch(getAllLeaderThunk(dataGetAllLeaderThunk))
    // Данный костыль построен для загрузки игры при обновлении страницы,
    // другие варианты не работали, на решение проблемы потрачено более 7 часов
    // в следующих версиях игры - ядро и создание новой игры - переедет на сервер
    // и тогда этот костыль будет убран
    const loadGame = async () => {
      const user = (await dispatch(
        getUserThunk()
      )) as PayloadAction<AxiosResponseUserApiType>
      const loadGame = await dispatch(
        findAllGamesInDBThunk(Number(user.payload.databaseUserStatus))
      )
      const data = loadGame.payload as
        | AxiosResponseGameApiType<GameDBType[]>
        | undefined
      if (data && data.databaseGameStatus.length > 0) {
        const { databaseGameStatus } = data
        const { game: loadDataGame, id } =
          databaseGameStatus[databaseGameStatus.length - 1]
        const createGame = new Game(JSON.parse(loadDataGame))
        createGame.setId(id)
        setGame(createGame)
        navigate(`/${AppRoute.Game}/${gameId}`)
      }
    }

    if (databaseId < 1) {
      loadGame()
    }
  }, [])

  return game ? (
    <GameDesk game={game} databaseId={databaseId} />
  ) : (
    <Navigate to={`/${AppRoute.Headquarters}`} />
  )
}
