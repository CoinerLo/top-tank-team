import { canvasEnginePlugins } from './canvasEngine'

// не смог типизировать
// @ts-ignore
canvasEnginePlugins.during.push((_: any, element: any) => {
  if (element.drawRound) {
    _.context.fillStyle = element.drawRound.c
    _.context.beginPath()
    _.context.roundRect(
      element.position.x + (element.drawRound.x || 0),
      element.position.y + (element.drawRound.y || 0),
      element.drawRound.w,
      element.drawRound.h,
      element.drawRound.r
    )
    _.context.fill()
  }
})
