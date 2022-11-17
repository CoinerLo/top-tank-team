import { BASE_COUNT_OF_CARDS_IN_HAND, endGameMessage } from '../../consts'
import { CardsDeckType, IUserData } from '../../types'
import { shuffleArray } from '../../utils'
import { Headquarters, headquartersByName } from '../HeadquartersDeck'

export class UserState {
  private name: string
  private headquarters: Headquarters
  private deck: CardsDeckType[]
  private hand: CardsDeckType[] = new Array(BASE_COUNT_OF_CARDS_IN_HAND)
  private throw: CardsDeckType[] = []
  private currentCountResources: number
  private futureСountResources: number

  constructor({ deck, headquartersName, userName }: IUserData) {
    this.name = userName
    this.headquarters = headquartersByName[headquartersName]
    this.deck = deck
    shuffleArray(this.deck)
    this.hand = this.hand.map(() => this.takeСardFromDeck() as CardsDeckType)
    this.currentCountResources = this.headquarters.bringsResources
    this.futureСountResources = this.currentCountResources
  }

  public takeСardFromDeck() {
    const card = this.deck.pop()
    if (card) {
      return card
    }
    this.theEndGame(endGameMessage.noCardsInDeck)
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

  public theEndGame(endMessage: string) {
    console.log(endMessage) // Пока так, при взаимодействии исправим
  }
}
