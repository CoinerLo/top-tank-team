import { BaseCardType } from '../../types'
import { nanoid } from '../../utils'

class BaseCard {
  name: string
  nation: string
  resourceСost: number
  tier: number
  id: string

  constructor({ name, nation, resourceСost, tier, id }: BaseCardType) {
    this.name = name
    this.resourceСost = resourceСost
    this.tier = tier
    this.nation = nation

    this.id = id ?? nanoid()
  }
}

export default BaseCard
