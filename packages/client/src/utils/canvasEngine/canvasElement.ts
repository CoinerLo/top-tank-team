import { GameDeskSegmentKeyType } from '../../gameCore/types'
import { BattleCardIcons, DPI_HEIGHT, IconsByName } from '../consts'

export interface IElementsCreator {
  type: string
  targetСell: GameDeskSegmentKeyType
  tankName: string
  tankBringsResources: number
  tankDamage: number
  tankHealth: number
  tankType: string
}

export class ElementsCreator {
  public targetСell
  public type
  private imgSrc
  private headImgSrc
  private tankName
  private tankBringsResources
  private tankDamage
  private tankHealth
  private headTextFillStyle = false

  constructor({
    type,
    tankName,
    tankHealth,
    tankType,
    tankDamage,
    tankBringsResources,
    targetСell,
  }: IElementsCreator) {
    this.targetСell = targetСell
    this.type = type
    this.tankName = tankName
    this.tankBringsResources = tankBringsResources
    this.tankDamage = tankDamage
    this.tankHealth = tankHealth
    this.imgSrc = (IconsByName as Record<string, string>)[tankName]
    this.headImgSrc = (BattleCardIcons as Record<string, string>)[tankType]
  }

  getElement() {
    return {
      type: this.type,
      position: {
        x: 0,
        y: DPI_HEIGHT - 170,
        cell: this.targetСell,
      },
      cardImg: { w: 170, h: 170, src: './../cards/battleCard.png' },
      baseImg: { w: 150, h: 125, dx: 10, dy: 36, src: this.imgSrc },
      bringsResourcesIconImg: {
        w: 39,
        h: 39,
        dx: 129,
        dy: 2,
        src: './../cards/bringsResources.png',
      },
      headIconImg: { w: 20, h: 18, dx: 3, dy: 10, src: this.headImgSrc },
      headText: {
        text: this.tankName,
        dx: 25,
        dy: 25,
        font: '15px Arial',
        fillStyle: this.headTextFillStyle ? 'red' : 'gray',
      },
      bringsResourcesText: {
        text: this.tankBringsResources.toString(),
        dx: 145,
        dy: 31,
        font: 'bold 18px Arial',
        fillStyle: '#000',
      },
      damage: {
        text: this.tankDamage.toString(),
        dx: 12,
        dy: 105,
        font: 'bold 18px Arial',
        fillStyle: '#64CB3E',
      },
      health: {
        text: this.tankHealth.toString(),
        dx: this.tankHealth > 9 ? 8 : 12,
        dy: 145,
        font: 'bold 16px Arial',
        fillStyle: '#fff',
      },
    }
  }

  toggleActiveElementState() {
    this.headTextFillStyle = !this.headTextFillStyle
  }

  moveActiveElement(target: GameDeskSegmentKeyType) {
    this.targetСell = target
  }

  changeHealth(health: number) {
    this.tankHealth = health
  }
}
