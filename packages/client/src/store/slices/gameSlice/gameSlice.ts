import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from '../../../gameCore/models/Game'
import { GameSlice } from '../../../typings'
import { NameSpace } from '../../../utils/consts'
import {
  createNewGameInDBThunk,
  findGameInDBThunk,
  updateGameInDBThunk,
  deleteGameInDBThunk,
  findAllGamesInDBThunk,
} from '../../api-thunks'

const initialState: GameSlice = {
  game: {},
}

export const gameSlice = createSlice({
  name: NameSpace.Game,
  initialState,
  reducers: {
    saveGame(state, action: PayloadAction<{ data: Game }>) {
      const { id } = action.payload.data
      state.game[id] = action.payload.data
    },
  },
  extraReducers: builder => {
    builder.addCase(createNewGameInDBThunk.fulfilled, (state, { payload }) => {
      const { id, game } = payload.databaseGameStatus
      state.game[id] = new Game(JSON.parse(game))
    }),
      builder.addCase(createNewGameInDBThunk.rejected, () => {
        console.log('Игра не создана')
      }),
      builder.addCase(findGameInDBThunk.fulfilled, (state, { payload }) => {
        const { id, game } = payload.databaseGameStatus
        const newGame = new Game(JSON.parse(game))
        newGame.setId(id)
        state.game[id] = newGame
      }),
      builder.addCase(findGameInDBThunk.rejected, () => {
        console.log('Игра не найдена')
      }),
      builder.addCase(updateGameInDBThunk.fulfilled, () => {
        console.log('Игра сохранена')
      }),
      builder.addCase(updateGameInDBThunk.rejected, () => {
        console.log('Игра не сохранена')
      }),
      builder.addCase(deleteGameInDBThunk.fulfilled, (state, { payload }) => {
        const id = payload.databaseGameStatus
        delete state.game[id]
      }),
      builder.addCase(deleteGameInDBThunk.rejected, () => {
        console.log('Игра не удалена')
      }),
      builder.addCase(findAllGamesInDBThunk.fulfilled, (state, { payload }) => {
        const games = payload.databaseGameStatus
        games.forEach(({ id, game }) => {
          const newGame = new Game(JSON.parse(game))
          newGame.setId(id)
          state.game[id] = newGame
        })
      }),
      builder.addCase(findAllGamesInDBThunk.rejected, () => {
        console.log('Игры не найдены')
      })
  },
})

export const { saveGame } = gameSlice.actions
