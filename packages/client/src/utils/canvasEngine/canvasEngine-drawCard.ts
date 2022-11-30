import { loadImage } from '..'
import { coordinates } from '../consts'
import { CanvasEngine } from './canvasEngine'
import { IElement } from './canvasTypings'

export const drawCard = async (_: CanvasEngine, element: IElement) => {
  if (_.context) {
    if (element.position.cell) {
      for (const key of Object.keys(coordinates)) {
        if (key == element.position.cell) {
          element.position.x = coordinates[key as keyof typeof coordinates].x
          element.position.y = coordinates[key as keyof typeof coordinates].y
        }
      }
    }

    const baseImg = new Image()
    await loadImage(element.baseImg.src, baseImg)
    _.context.drawImage(
      baseImg,
      element.position.x + element.baseImg.dx,
      element.position.y + element.baseImg.dy,
      element.baseImg.w,
      element.baseImg.h
    )

    const cardImg = new Image()
    await loadImage(element.cardImg.src, cardImg)
    _.context.drawImage(
      cardImg,
      element.position.x,
      element.position.y,
      element.cardImg.w,
      element.cardImg.h
    )

    const bringsResourcesIconImg = new Image()
    await loadImage(element.bringsResourcesIconImg.src, bringsResourcesIconImg)
    _.context.drawImage(
      bringsResourcesIconImg,
      element.position.x + element.bringsResourcesIconImg.dx,
      element.position.y + element.bringsResourcesIconImg.dy,
      element.bringsResourcesIconImg.w,
      element.bringsResourcesIconImg.h
    )

    const headIconImg = new Image()
    await loadImage(element.headIconImg.src, headIconImg)
    _.context.drawImage(
      headIconImg,
      element.position.x + element.headIconImg.dx,
      element.position.y + element.headIconImg.dy,
      element.headIconImg.w,
      element.headIconImg.h
    )

    _.context.fillStyle = element.headText.fillStyle
    _.context.font = element.headText.font
    _.context.fillText(
      element.headText.text,
      element.position.x + element.headText.dx,
      element.position.y + element.headText.dy
    )
    _.context.fillStyle = element.bringsResourcesText.fillStyle
    _.context.font = element.bringsResourcesText.font
    _.context.fillText(
      element.bringsResourcesText.text,
      element.position.x + element.bringsResourcesText.dx,
      element.position.y + element.bringsResourcesText.dy
    )
    _.context.fillStyle = element.damage.fillStyle
    _.context.fillText(
      element.damage.text,
      element.position.x + element.damage.dx,
      element.position.y + element.damage.dy
    )
    _.context.fillStyle = element.health.fillStyle
    _.context.font = element.health.font
    _.context.fillText(
      element.health.text,
      element.position.x + element.health.dx,
      element.position.y + element.health.dy
    )
  }
}
