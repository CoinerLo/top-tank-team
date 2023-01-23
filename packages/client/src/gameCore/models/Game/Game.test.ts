import { Game } from '.'
import { HeadquartersNames } from '../../../utils/consts'
import { COUNT_CARDS_IN_PLAYER_DECK } from '../../consts'
import { getRandomUserDeck } from '../../mockData'
import { Desk } from '../Desk'

const userData = {
  userName: 'player1',
  headquartersName: HeadquartersNames.usa,
  deck: getRandomUserDeck(COUNT_CARDS_IN_PLAYER_DECK),
}

const opponentData = {
  userName: 'player2',
  headquartersName: HeadquartersNames.german,
  deck: getRandomUserDeck(COUNT_CARDS_IN_PLAYER_DECK),
}

const id = 1

let game: Game

beforeEach(() => {
  game = new Game({ userData, opponentData })
  game.setId(id)
})

test('Game start configuration', () => {
  const gameState = game.getFullState()
  expect(gameState.id).toBe(1)
})

test('Game start getDesk', () => {
  const gameDesk = game.getDesk()
  expect(gameDesk).toBeInstanceOf(Desk)
})
