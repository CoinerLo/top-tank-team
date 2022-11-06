import { HeadquartersData } from '../../content/Headquarters'
import { HeadquartersDataType, ISpecialProperties } from '../../types'
import BaseCard from '../BaseCard'

export class Headquarters extends BaseCard {
  specialProperties: ISpecialProperties | undefined
  damage: number
  health: number
  type: string
  bringsResources: number

  constructor({
    name,
    nation,
    tier,
    specialProperties,
    damage,
    health,
    type,
    bringsResources,
  }: HeadquartersDataType) {
    super({ name, nation, tier, resourceСost: 0 })
    this.specialProperties = specialProperties
    this.damage = damage
    this.health = health
    this.type = type
    this.bringsResources = bringsResources
  }
}

export const fullHeadquartersDeck = HeadquartersData.map(
  headquarters => new Headquarters(headquarters)
)
