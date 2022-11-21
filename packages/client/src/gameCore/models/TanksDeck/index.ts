import BaseCard from '../BaseCard'
import { TanksData } from '../../content/Tanks'
import { ISpecialProperties, TanksDataType } from '../../types'
import { decksOfCardsByTier } from '../../utils'

export class Tank extends BaseCard {
  bringsResources: number
  type: string
  damage: number
  health: number
  specialProperties: ISpecialProperties | undefined

  constructor({
    name,
    damage,
    health,
    nation,
    resourceСost,
    bringsResources,
    tier,
    type,
    specialProperties,
  }: TanksDataType) {
    super({ name, nation, resourceСost, tier })
    this.bringsResources = bringsResources
    this.type = type
    this.damage = damage
    this.health = health
    this.specialProperties = specialProperties
  }
}
//TODO Убрать лишние операции ... и [] (Xroniks - Постников Павел)
export const fullTanksDeck = [
  ...TanksData.map(tankData => [
    new Tank(tankData),
    new Tank(tankData),
    new Tank(tankData),
  ]).flat(),
]

export const decksOfTanksByTier = decksOfCardsByTier(fullTanksDeck)
