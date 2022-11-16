import { allCardsForDeck } from './allCardsForDeck'
import { shuffleArray } from './utils'

export const getRandomUserDeck = (length: number) => {
  const shuffledAllCardsForDeck = [...allCardsForDeck]
  shuffleArray(shuffledAllCardsForDeck)

  return shuffledAllCardsForDeck.slice(0, length)
}
