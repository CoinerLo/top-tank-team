import { CanvasEngine } from './canvasEngine'
import { drawCard } from './canvasEngine-drawCard'
import { IGridElement } from './canvasTypings'

export const canvasEnginePlugins = {
  during: {
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
