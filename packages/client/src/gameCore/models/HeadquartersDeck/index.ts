import { IconsByName } from '../../../utils/consts'
import { HeadquartersData } from '../../content/Headquarters'
import { HeadquartersDataType, ISpecialProperties } from '../../types'
import BaseCard from '../BaseCard'

export class Headquarters extends BaseCard {
  specialProperties: ISpecialProperties | undefined
  damage: number
  health: number
  type: string
  bringsResources: number
  icon

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
    this.icon = IconsByName[name]
  }
}

export const fullHeadquartersDeck = HeadquartersData.map(
  headquarters => new Headquarters(headquarters)
)

export const headquartersByName = fullHeadquartersDeck.reduce(
  (acc, headquarters) => {
    acc[headquarters.name] = headquarters
    return acc
  },
  {} as Record<string, Headquarters>
)

export enum HeadquartersNames {
  german = 'Trainingslager',
  usa = 'Training Camp',
  ussr = 'Учебная часть',
}
