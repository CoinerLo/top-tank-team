import { coordinates } from '../consts'

export const drawCard = (_: any, element: any) => {
  if (element.type == 'card') {
    if (element.position.cell) {
      for (const key of Object.keys(coordinates)) {
        if (key == element.position.cell) {
          element.position.x = coordinates[key as keyof typeof coordinates].x
          element.position.y = coordinates[key as keyof typeof coordinates].y
        }
      }
    }
    const baseImg = new Image()
    baseImg.src = element.baseImg.src
    baseImg.onload = () => {
      _.context.drawImage(
        baseImg,
        element.position.x + element.baseImg.dx,
        element.position.y + element.baseImg.dy,
        element.baseImg.w,
        element.baseImg.h
      )
      const cardImg = new Image()
      cardImg.src = element.cardImg.src
      cardImg.onload = () => {
        _.context.drawImage(
          cardImg,
          element.position.x,
          element.position.y,
          element.cardImg.w,
          element.cardImg.h
        )
        const bringsResourcesIconImg = new Image()
        bringsResourcesIconImg.src = element.bringsResourcesIconImg.src
        bringsResourcesIconImg.onload = () => {
          _.context.drawImage(
            bringsResourcesIconImg,
            element.position.x + element.bringsResourcesIconImg.dx,
            element.position.y + element.bringsResourcesIconImg.dy,
            element.bringsResourcesIconImg.w,
            element.bringsResourcesIconImg.h
          )
          const headIconImg = new Image()
          headIconImg.src = element.headIconImg.src
          headIconImg.onload = () => {
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
      }
    }
  }
}

const loadImage = (src: any) => {
  return new Promise(resolve => {
    const image = new Image()
    image.src = src
    image.onload = () => resolve(image)
  })
}

// async () => {
//   imageL = (await loadImage('./../cards/battleCard.png')) as CanvasImageSource
//   if (ctx) {
//     if (imageL) {
//       ctx?.drawImage(imageL, 0, DPI_HEIGHT - 200, 200, 200)
//     }
//     const image2 = (await loadImage(
//       './../cards/images/headquarters/ussr-image.png'
//     )) as CanvasImageSource
//     ctx.drawImage(image2, 0 + 16, DPI_HEIGHT - 200 + 40, 170, 152)
//     const image3 = (await loadImage(
//       './../cards/bringsResources.png'
//     )) as CanvasImageSource
//     ctx.drawImage(image3, 0 + 150, DPI_HEIGHT - 200, 50, 50)
//     const image4 = (await loadImage(
//       './../cards/icons/head-icon.png'
//     )) as CanvasImageSource
//     ctx.drawImage(image4, 0 + 3, DPI_HEIGHT - 190, 25, 25)
//     ctx.fillStyle = 'gray'
//     ctx.font = '12pt Arial'
//     ctx.fillText('Учебная часть', 0 + 30, DPI_HEIGHT - 170)
//     ctx.fillStyle = '#000'
//     ctx.font = 'bold 16pt Arial'
//     ctx.fillText('5', 0 + 172, DPI_HEIGHT - 165)
//   }
// }
