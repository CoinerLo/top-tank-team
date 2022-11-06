import { OredersData } from '../../content/Orders'
import { ISpecialProperties, OredersDataType } from '../../types'
import { decksOfCardsByTier } from '../../utils'
import BaseCard from '../BaseCard'

export class Order extends BaseCard {
  specialProperties: ISpecialProperties

  constructor({
    name,
    nation,
    resourceСost,
    tier,
    specialProperties,
  }: OredersDataType) {
    super({ name, nation, resourceСost, tier })
    this.specialProperties = specialProperties
  }
}

export const fullOrderDeck = OredersData.map(orderData => new Order(orderData))

export const decksOfOredersByTier = decksOfCardsByTier(fullOrderDeck)
