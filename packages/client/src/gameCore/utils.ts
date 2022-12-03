import { allCardsForDeck } from './allCardsForDeck'
import BaseCard from './models/BaseCard'

export const decksOfCardsByTier = <T extends BaseCard>(cardsArray: T[]) =>
  cardsArray.reduce(
    (acc, card) => {
      const { tier } = card
      switch (tier) {
        case 1:
          acc.first.push(card)
          return acc
        case 2:
          acc.second.push(card)
          return acc
        case 3:
          acc.third.push(card)
          return acc
        default:
          return acc
      }
    },
    {
      first: [] as T[],
      second: [] as T[],
      third: [] as T[],
    }
  )

export const findCardFromDeckById = (id: string) => {
  return allCardsForDeck.find(card => Number(card.id) === Number(id))
}

const ids = [0]
export const nanoid = () => {
  const nextID = ids[ids.length - 1] + 1
  ids.push(nextID)
  return nextID.toString()
} // MEMORY: решение с таким id временное, до создания постоянного хранилища данных

export const shuffleArray = <T>(array: T[]) => {
  const copyArray = [...array]
  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]]
  }
  return copyArray
}

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max)
}

export const getMaxMoves = (type: string) => {
  if (type === 'лёгкий') {
    return 2
  }
  return 1
}
