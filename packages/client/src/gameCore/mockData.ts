import { allCardsForDeck } from './allCardsForDeck'
import { shuffleArray } from './utils'

export const getRandomUserDeck = (length: number) => {
  const shuffledAllCardsForDeck = [...allCardsForDeck]
  const result = shuffleArray(shuffledAllCardsForDeck)

  return result.slice(0, length)
}
