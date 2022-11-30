import BaseCard from './models/BaseCard'
import { Headquarters } from './models/HeadquartersDeck'
import { IGamingDesk } from './types'

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

export const getNewGamingDesk = (
  userHeadquarters: Headquarters,
  opponentHeadquarters: Headquarters
): IGamingDesk => ({
  a1: null,
  a2: null,
  a3: null,
  a4: null,
  a5: opponentHeadquarters,

  b1: null,
  b2: null,
  b3: null,
  b4: null,
  b5: null,

  c1: userHeadquarters,
  c2: null,
  c3: null,
  c4: null,
  c5: null,
})

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
