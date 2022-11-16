import { decksOfTanksByTier } from './models/TanksDeck'

const allCardsTanksByFirstTier = [...decksOfTanksByTier.first]

export const allCardsForDeck = [
  ...allCardsTanksByFirstTier,
  ...allCardsTanksByFirstTier,
  ...allCardsTanksByFirstTier,
]
