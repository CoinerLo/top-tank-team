import BaseCard from '../BaseCard'
import { PlatoonsData } from '../../content/Platoons'
import { decksOfCardsByTier } from '../../utils'
import { ISpecialProperties, PlatoonsDataType } from '../../types'

export class Platoon extends BaseCard {
  bringsResources: number
  type: string
  damage: number | undefined
  health: number
  specialProperties: ISpecialProperties | undefined
  defense: number | undefined

  constructor({
    name,
    nation,
    tier,
    type,
    health,
    bringsResources,
    resourceСost,
    damage,
    defense,
    specialProperties,
  }: PlatoonsDataType) {
    super({ name, nation, resourceСost, tier })
    this.bringsResources = bringsResources
    this.type = type
    this.damage = damage
    this.defense = defense
    this.health = health
    this.specialProperties = specialProperties
  }
}

export const fullPlatoonsDeck = PlatoonsData.map(
  platoonData => new Platoon(platoonData)
)

export const decksOfPlatoonsByTier = decksOfCardsByTier(fullPlatoonsDeck)
