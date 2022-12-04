import { CurrentGamer } from './models/Game'
import { GameDeskSegmentKeyType } from './types'

export const BASE_COUNT_OF_CARDS_IN_HAND = 6
export const COUNT_CARDS_IN_PLAYER_DECK = 30

export const endGameMessage = {
  noCardsInDeck: 'Карты в вашей колоде закончились! Вы проиграли!',
}

export enum operationConst {
  'inc',
  'dec',
}

export const accessibleGridForLanding: Record<
  CurrentGamer,
  GameDeskSegmentKeyType[]
> = {
  user: ['B1', 'B2', 'C2'],
  opponent: ['A4', 'B4', 'B5'],
}
