import { canvasEnginePlugins } from './canvasEngine'

// не смог типизировать
// @ts-ignore
canvasEnginePlugins.during.push((_: any, element: any) => {
  if (element.drawRect) {
    _.context.fillStyle = element.drawRect.c
    _.context.beginPath()
    _.context.rect(
      element.position.x + (element.drawRect.x || 0),
      element.position.y + (element.drawRect.y || 0),
      element.drawRect.w,
      element.drawRect.h
    )
    _.context.fill()
  }
})
