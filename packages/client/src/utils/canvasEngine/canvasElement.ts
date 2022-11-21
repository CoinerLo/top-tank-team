import { Tank } from '../../gameCore/models/TanksDeck'
import { BattleCardIcons, DPI_HEIGHT, IconsByName } from '../consts'

export interface IElementsCreator {
  type: string
  tank: Tank
  targetСell: string
}

export class ElementsCreator {
  targetСell: string
  type: string
  tank: Tank
  imgSrc: string
  headImgSrc: string

  constructor({ type, tank, targetСell }: IElementsCreator) {
    this.targetСell = targetСell
    this.type = type
    this.tank = tank
    this.imgSrc = (IconsByName as Record<string, string>)[tank.name]
    this.headImgSrc = (BattleCardIcons as Record<string, string>)[tank.type]
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
        text: this.tank.name,
        dx: 25,
        dy: 25,
        font: '10pt Arial',
        fillStyle: 'gray',
      },
      bringsResourcesText: {
        text: this.tank.bringsResources.toString(),
        dx: 145,
        dy: 31,
        font: 'bold 18px Arial',
        fillStyle: '#000',
      },
      damage: {
        text: this.tank.damage.toString(),
        dx: 12,
        dy: 105,
        font: 'bold 18px Arial',
        fillStyle: '#64CB3E',
      },
      health: {
        text: this.tank.health.toString(),
        dx: 12,
        dy: 145,
        font: 'bold 18px Arial',
        fillStyle: '#fff',
      },
    }
  }
}
