import { CanvasEngine, IGridElement } from './canvasEngine'
import { drawCard } from './canvasEngine-drawCard'

export const canvasEnginePlugins = {
  after: [],
  before: [],
  during: {
    // (_: CanvasEngine, element: any) => { // Пока не используем, но может понадобится
    //   if (element.afterRender || false) {
    //     element.afterRender(_, element)
    //   }
    // },
    // (_: CanvasEngine, element: any) => {
    //   if (element.beforeRender || false) {
    //     element.beforeRender(_, element)
    //   }
    // },
    gridPlugins: [
      (_: CanvasEngine, element: IGridElement) => {
        if (element.grid && _.context) {
          const DPI_WIDTH = _.canvas.offsetWidth
          const DPI_HEIGHT = _.canvas.offsetHeight
          const step = DPI_HEIGHT / 3
          const stepX = DPI_WIDTH / 5
          _.context.strokeStyle = element.grid.c
          _.context.lineWidth = element.grid.lineWidth
          _.context.beginPath()
          for (let i = 1; i < 3; i++) {
            const y = step * i
            _.context.moveTo(0, y)
            _.context.lineTo(DPI_WIDTH, y)
          }
          for (let i = 1; i < 5; i++) {
            const x = stepX * i
            _.context.moveTo(x, 0)
            _.context.lineTo(x, DPI_HEIGHT)
          }
          _.context.stroke()
          _.context.closePath
        }
      },
    ],
    elementsPlugins: [drawCard],
  },
}
