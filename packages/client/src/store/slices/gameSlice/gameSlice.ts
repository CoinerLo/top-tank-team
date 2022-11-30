import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from '../../../gameCore/models/Game'
import { GameSlice } from '../../../typings'
import { NameSpace } from '../../../utils/consts'

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
})

export const { saveGame } = gameSlice.actions
