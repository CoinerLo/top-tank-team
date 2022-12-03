import { BASE_COUNT_OF_CARDS_IN_HAND, operationConst } from '../../consts'
import { CardsDeckType, IGameUserStateSave, IUserData } from '../../types'
import { findCardFromDeckById, getRandomInt, shuffleArray } from '../../utils'
import { Headquarters, headquartersByName } from '../HeadquartersDeck'
import { Tank } from '../TanksDeck'

export class UserState {
  private name: string
  private headquarters: Headquarters
  private deck: CardsDeckType[]
  private hand: CardsDeckType[] = new Array(BASE_COUNT_OF_CARDS_IN_HAND).fill(0)
  private throw: CardsDeckType[] = []
  private currentCountResources: number
  private futureСountResources: number
  private resourcesSpent = 0
  private vehiclesDestroyed = 0
  private platoonsDestroyed = 0
  private ordersPlayed = 0

  constructor(userData: IUserData | IGameUserStateSave) {
    if (Object.hasOwn(userData, 'headquartersName')) {
      const { deck, headquartersName, userName } = userData as IUserData
      this.name = userName
      this.headquarters = headquartersByName[headquartersName]
      this.deck = shuffleArray(deck)
      this.hand = this.hand.map(() => this.takeСardFromDeck() as CardsDeckType)
      this.currentCountResources = this.headquarters.bringsResources
      this.futureСountResources = this.currentCountResources
    } else {
      const {
        currentCountResources,
        deck,
        futureСountResources,
        hand,
        headquarters,
        name,
        ordersPlayed,
        platoonsDestroyed,
        resourcesSpent,
        throw: throwDeck,
        vehiclesDestroyed,
      } = userData as IGameUserStateSave
      this.name = name
      this.headquarters = headquartersByName[headquarters.name]
      this.deck = deck.map(card => findCardFromDeckById(card.id) ?? card)
      this.hand = hand.map(card => findCardFromDeckById(card.id) ?? card)
      this.throw = throwDeck.map(card => findCardFromDeckById(card.id) ?? card)
      this.currentCountResources = currentCountResources
      this.futureСountResources = futureСountResources
      this.resourcesSpent = resourcesSpent
      this.vehiclesDestroyed = vehiclesDestroyed
      this.platoonsDestroyed = platoonsDestroyed
      this.ordersPlayed = ordersPlayed
    }
  }

  public startActionGamer() {
    const card = this.takeСardFromDeck()
    if (card) {
      this.hand.push(card)
      this.currentCountResources = this.futureСountResources
      return true
    }
    return false
  }

  public endActionGamer() {
    let countCardsInHand = this.getCountCardsInHand()
    if (countCardsInHand > 6) {
      while (countCardsInHand > 6) {
        const card = this.receiveRandomCardFromHand()
        if (card) {
          this.putCardIntoDiscardPile(card)
        }
        countCardsInHand = this.getCountCardsInHand()
      }
    }
  }

  public takeСardFromDeck() {
    const card = this.deck.pop()
    if (card) {
      return card
    }
    return false
  }

  public takeCardFromHand(id: string) {
    const card = this.hand.find(card => card.id === id)
    if (card) {
      this.hand = this.hand.filter(card => card.id !== id)
      return card
    }
  }

  public returnCardToHand(card: CardsDeckType | undefined) {
    if (card === undefined) {
      return
    }
    this.hand.push(card)
  }

  public getCountOfDiscardedCards() {
    return this.throw.length
  }

  public getCountCardsInDeck() {
    return this.deck.length
  }

  public getCurrentCountResources() {
    return this.currentCountResources
  }

  public getFutureСountResources() {
    return this.futureСountResources
  }

  public updateCurrentСountResources(
    operation: operationConst,
    number: number | undefined
  ) {
    if (number === undefined) {
      return false
    }
    if (operation === operationConst.inc) {
      this.currentCountResources += number
      return true
    }
    if (this.currentCountResources - number >= 0) {
      this.currentCountResources -= number
      this.resourcesSpent += number
      return true
    }
    return false
  }

  public updateFutureСountResources(operation: operationConst, number: number) {
    if (operation === operationConst.inc) {
      this.futureСountResources += number
      return true
    }
    const result = this.futureСountResources - number
    this.futureСountResources = result >= 0 ? result : 0
    return true
  }

  public bringingEquipmentToBattlefield(activeCardInHand: string) {
    const card = this.takeCardFromHand(activeCardInHand)
    const canBuyCard = this.updateCurrentСountResources(
      operationConst.dec,
      card?.resourceСost
    )
    if (canBuyCard) {
      const bringsResources = (card as Tank).bringsResources
      this.updateFutureСountResources(operationConst.inc, bringsResources)
    } else {
      this.returnCardToHand(card)
      return false
    }
    return card
  }

  public getUserName() {
    return this.name
  }

  public getCardsInHand() {
    return this.hand
  }

  public getCountCardsInHand() {
    return this.hand.length
  }

  public getHeadquarters() {
    return this.headquarters
  }

  public receiveRandomCardFromHand() {
    const numberCard = getRandomInt(this.getCountCardsInHand())
    const idCard = this.hand[numberCard].id
    const card = this.takeCardFromHand(idCard)
    if (card) {
      return card
    }
    return null
  }

  public putCardIntoDiscardPile(card: CardsDeckType) {
    this.throw.push(card)
  }

  public getCountResourcesSpent() {
    return this.resourcesSpent
  }

  public getCountVehiclesDestroyed() {
    return this.vehiclesDestroyed
  }

  public updateCountVehiclesDestroyed(number: number) {
    this.vehiclesDestroyed += number
  }

  public getCountPlatoonsDestroyed() {
    return this.platoonsDestroyed
  }

  public updateCountPlatoonsDestroyed(number: number) {
    this.platoonsDestroyed += number
  }

  public getCountOrdersPlayed() {
    return this.ordersPlayed
  }

  public updateCountOrdersPlayed(number: number) {
    this.ordersPlayed += number
  }

  public saveGame(): IGameUserStateSave {
    return {
      name: this.name,
      headquarters: this.headquarters,
      deck: this.deck,
      hand: this.hand,
      throw: this.throw,
      currentCountResources: this.currentCountResources,
      futureСountResources: this.futureСountResources,
      resourcesSpent: this.resourcesSpent,
      vehiclesDestroyed: this.vehiclesDestroyed,
      platoonsDestroyed: this.platoonsDestroyed,
      ordersPlayed: this.ordersPlayed,
    }
  }
}
