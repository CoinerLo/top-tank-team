import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DecksSlice } from '../../../typings'
import { NameSpace } from '../../../utils/consts'
import { getRandomUserDeck } from '../../../gameCore/mockData'
import { COUNT_CARDS_IN_PLAYER_DECK } from '../../../gameCore/consts'

const initialState: DecksSlice = {
  decks: {
    first: getRandomUserDeck(COUNT_CARDS_IN_PLAYER_DECK),
  },
}

export const decksSlice = createSlice({
  name: NameSpace.Decks,
  initialState,
  reducers: {
    // getStartDeck(state) {
    //   if (state.decks.first.length == 0) {
    //     state.decks.first = getRandomUserDeck(COUNT_CARDS_IN_PLAYER_DECK)
    //   }
    // },
  },
})
