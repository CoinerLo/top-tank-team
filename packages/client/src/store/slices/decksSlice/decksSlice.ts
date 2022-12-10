import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DecksSlice } from '../../../typings'
import { NameSpace } from '../../../utils/consts'
import { getRandomUserDeck } from '../../../gameCore/mockData'
import { COUNT_CARDS_IN_PLAYER_DECK } from '../../../gameCore/consts'
import { Tank } from '../../../gameCore/models/TanksDeck'

const initialState: DecksSlice = {
  decks: {
    first: getRandomUserDeck(COUNT_CARDS_IN_PLAYER_DECK),
    second: getRandomUserDeck(COUNT_CARDS_IN_PLAYER_DECK),
  },
}

export const decksSlice = createSlice({
  name: NameSpace.Decks,
  initialState,
  reducers: {
    saveUserDeck(state, action: PayloadAction<{ data: Tank[]; name: string }>) {
      state.decks[action.payload.name] = action.payload.data
    },
    addUserDeck(state, action: PayloadAction<string>) {
      state.decks[action.payload] = getRandomUserDeck(
        COUNT_CARDS_IN_PLAYER_DECK
      )
    },
  },
})
export default initialState