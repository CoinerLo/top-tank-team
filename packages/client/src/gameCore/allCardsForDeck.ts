import { decksOfTanksByTier } from './models/TanksDeck'

const allCardsTanksByFirstTier = [...decksOfTanksByTier.first]

export const allCardsForDeck = [...allCardsTanksByFirstTier]

export const findCardFromDeckById = (id: string) => {
  return allCardsForDeck.find(card => Number(card.id) === Number(id))
}
