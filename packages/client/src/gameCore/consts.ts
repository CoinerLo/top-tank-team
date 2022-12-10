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

export const listPositions: Record<
  GameDeskSegmentKeyType,
  GameDeskSegmentKeyType[]
> = {
  A1: ['A2', 'B1', 'B2'],
  A2: ['A1', 'B1', 'B2', 'B3', 'A3'],
  A3: ['A2', 'B2', 'B3', 'B4', 'A4'],
  A4: ['A3', 'B3', 'B4', 'B5', 'A5'],
  A5: ['A4', 'B4', 'B5'],
  B1: ['A1', 'A2', 'B2', 'C2', 'C1'],
  B2: ['A1', 'A2', 'A3', 'B1', 'B3', 'C1', 'C2', 'C3'],
  B3: ['A2', 'A3', 'A4', 'B2', 'B4', 'C2', 'C3', 'C4'],
  B4: ['A3', 'A4', 'A5', 'B3', 'B5', 'C3', 'C4', 'C5'],
  B5: ['A4', 'A5', 'B4', 'C4', 'C5'],
  C1: ['B1', 'B2', 'C2'],
  C2: ['C1', 'B1', 'B2', 'B3', 'C3'],
  C3: ['C2', 'B2', 'B3', 'B4', 'C4'],
  C4: ['C3', 'B3', 'B4', 'B5', 'C5'],
  C5: ['C4', 'B4', 'B5'],
}
