import { OrdersData } from '../../content/Orders'
import { ISpecialProperties, OrdersDataType } from '../../types'
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
  }: OrdersDataType) {
    super({ name, nation, resourceСost, tier })
    this.specialProperties = specialProperties
  }
}

export const fullOrderDeck = OrdersData.map(orderData => new Order(orderData))

export const decksOfOredersByTier = decksOfCardsByTier(fullOrderDeck)
