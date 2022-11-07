import { nanoid } from 'nanoid'
import { BaseCardType } from '../../types'

class BaseCard {
  name: string
  nation: string
  resourceСost: number
  tier: number
  id: string

  constructor({ name, nation, resourceСost, tier }: BaseCardType) {
    this.name = name
    this.resourceСost = resourceСost
    this.tier = tier
    this.nation = nation

    this.id = nanoid()
  }
}

export default BaseCard
