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
