import { UserState } from '.'
import {
  BASE_COUNT_OF_CARDS_IN_HAND,
  COUNT_CARDS_IN_PLAYER_DECK,
} from '../../consts'
import { getRandomUserDeck } from '../../mockData'
import { HeadquartersNames } from '../HeadquartersDeck'

let newUserState: UserState

const deck = getRandomUserDeck(COUNT_CARDS_IN_PLAYER_DECK)
const userName = 'player1'
const headquartersName = HeadquartersNames.german

beforeEach(
  () => (newUserState = new UserState({ userName, deck, headquartersName }))
)

test('User state create', () => {
  const playerNick = newUserState.getUserName()
  expect(playerNick).toBe('player1')
})

test('User state getCountCardsInHand', () => {
  const countPlayerCardsInHand = newUserState.getCountCardsInHand()
  expect(countPlayerCardsInHand).toBe(BASE_COUNT_OF_CARDS_IN_HAND)
})
